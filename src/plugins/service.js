const { Op } = require("sequelize");
const sequelize = require("@/plugins/sequelize");
const Register = require("@/models/RegisterModel");
const Company = require("@/models/CompanyModel");
const Department = require("@/models/DepartmentModel");
const Project = require("@/models/ProjectModel");

const handleParams = params => {
  let result = {};
  if (params.project) {
    result.project = { [Op.substring]: params.project };
  }
  if (params.dateTime && params.dateTime.length) {
    result.dateTime = {
      [Op.between]: params.dateTime
    };
  }
  return result;
};

export const queryRegister = (params, chosenCompanies) => {
  const include = {
    model: Company,
    where: {
      id: {
        [Op.or]: chosenCompanies
      }
    },
    attributes: ["id", "company"],
    through: { attributes: [] }
  };
  return Register.findAll({
    include,
    where: handleParams(params),
    order: [["dateTime", "DESC"]]
  });
};

export const countRegister = params => {
  return Register.count({
    where: {
      dateTime: {
        [Op.between]: params
      }
    }
  });
};

export const countRegisterGroupByCompany = () => {
  return sequelize.query(
    `select count(rc.companyId) as value, c.company as name
    from register_company rc
             join company c on c.id = rc.companyId
    group by rc.companyId
    order by value desc
    limit 10`
  );
};

export const queryCompaniesWithSelect = () => {
  return Company.findAll({
    attributes: ["id", "company"],
    where: {
      effective: true
    },
    order: [["pinyin", "DESC"]]
  });
};

export const queryDepartmentsWithSelect = () => {
  return Department.findAll({
    attributes: ["id", "department"],
    where: {
      effective: true
    },
    order: [["pinyin", "DESC"]]
  });
};

export const queryProjectsWithSelect = () => {
  return Project.findAll({
    attributes: ["id", "project"],
    where: {
      effective: true
    },
    order: [["pinyin", "DESC"]]
  });
};

export const querySimilar = (model, column, value) => {
  return model.findAll({
    attributes: ["id", column],
    where: {
      [column]: {
        [Op.substring]: value,
        [Op.ne]: value
      }
    }
  });
};

export const mergeRepeat = async (current, target) => {
  try {
    await sequelize.transaction(async t => {
      await sequelize.model("CompanyRegister").update(
        { companyId: target },
        {
          where: { companyId: current }
        },
        { transaction: t }
      );
      await Company.destroy(
        {
          where: {
            id: current
          }
        },
        { transaction: t }
      );
    });
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getModel = type => {
  switch (type) {
    case "company":
      return Company;
    case "department":
      return Department;
    case "project":
      return Project;
    default:
      return null;
  }
};
