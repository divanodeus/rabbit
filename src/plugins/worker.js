const { ipcRenderer } = require("electron");
const XLSX = require("xlsx");
const sequelize = require("@/plugins/sequelize");
const Register = require("@/models/RegisterModel");
const Company = require("@/models/CompanyModel");
const Department = require("@/models/DepartmentModel");
const Project = require("@/models/ProjectModel");
const dayjs = require("dayjs");
require("dayjs/locale/zh-cn");
dayjs.locale("zh-cn");

const _enum = {
  READ_FILE: "正在读取文件，请稍等...",
  PARSING: "文件读取成功，正在解析...",
  IMPORT: "解析成功，正在导入...",
  EXPORT: "正在导出...",
  IMPORT_SUCCESS: 200,
  EXPORT_SUCCESS: 201
};

function convertArray(str) {
  var arr = str.split(/[\n\s+,，；;\\+]/g);
  arr = Array.from(new Set(arr)).filter(t => Boolean(t));
  return arr;
}

async function handleCompanies(registerCompanies, companiesMap) {
  let companies = [];
  registerCompanies = convertArray(registerCompanies);
  for await (const company of registerCompanies) {
    if (!companiesMap[company]) {
      const [model, created] = await Company.findOrCreate({
        where: { company }
      });
      companiesMap[company] = model;
      console.log(created);
      companies.push(model);
    } else {
      companies.push(companiesMap[company]);
    }
  }
  return companies;
}

async function handleDepartment(department, departmentMap) {
  department = department.trim();
  if (!departmentMap[department]) {
    await Department.findOrCreate({
      where: { department }
    });
    departmentMap[department] = true;
  }
}

async function handleProject(projects, projectMap) {
  projects = convertArray(projects);
  for await (const project of projects) {
    if (!projectMap[project]) {
      await Project.findOrCreate({
        where: { project }
      });
      projectMap[project] = true;
    }
  }
}

async function handleImport(workbook_json) {
  let companiesMap = new Map();
  let departmentMap = new Map();
  let projectMap = new Map();
  for await (const register of workbook_json) {
    if (register.company && register.dateTime) {
      let companies = await handleCompanies(register.company, companiesMap);
      if (register.department) {
        await handleDepartment(register.department, departmentMap);
      }
      if (register.project) {
        await handleProject(register.project, projectMap);
      }
      if (Number(register.dateTime)) {
        register.dateTime = XLSX.SSF.format("yyyy-mm-dd", register.dateTime);
      } else {
        register.dateTime = dayjs(register.dateTime).format("YYYY-MM-DD");
      }
      try {
        await sequelize.transaction(async t => {
          let registerModel = await Register.create(register, {
            transaction: t
          });
          await registerModel.setCompanies(companies, {
            transaction: t
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
}

export const importXLXS = async path => {
  ipcRenderer.send("processXLSX", _enum.READ_FILE);
  const workbook = XLSX.readFile(path[0], { type: "file" });
  ipcRenderer.send("processXLSX", _enum.PARSING);
  const workbook_json = XLSX.utils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]],
    {
      header: [
        "index",
        "company",
        "cause",
        "dateTime",
        "transactor",
        "sealContents",
        "copies",
        "partyB",
        "project",
        "department",
        "remark"
      ],
      defval: ""
    }
  );
  workbook_json.shift();
  ipcRenderer.send("processXLSX", _enum.IMPORT);
  await handleImport(workbook_json);
  ipcRenderer.send("processXLSX", _enum.IMPORT_SUCCESS);
};

export const exportXLSX = ({ path, data }) => {
  ipcRenderer.send("processXLSX", _enum.EXPORT);
  const header = {
    dateTime: "时间",
    companies: "公司",
    project: "项目",
    cause: "事由",
    sealContents: "文件类型",
    copies: "份数",
    transactor: "经办人",
    department: "经办人所属部门",
    partyB: "对方单位",
    remark: "备注"
  };
  let sheets = {};
  data.forEach(register => {
    const companies = Array.from(register.companies, ({ company }) => company);
    const sheetName = companies.length > 1 ? "其它" : companies.toString();
    register.companies = companies.toString();
    if (sheets[sheetName]) {
      sheets[sheetName].push(register);
    } else {
      sheets[sheetName] = [header, register];
    }
  });
  const workbook = XLSX.utils.book_new();
  for (const [name, sheet] of Object.entries(sheets)) {
    const worksheet = XLSX.utils.json_to_sheet(sheet, {
      skipHeader: true
    });
    XLSX.utils.book_append_sheet(workbook, worksheet, name);
  }
  XLSX.writeFile(workbook, `${path}`);
  ipcRenderer.send("processXLSX", _enum.EXPORT_SUCCESS);
};
