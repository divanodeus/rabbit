<template>
  <Layout>
    <template #header>
      <el-row :gutter="20">
        <el-col :span="6" class="flex align-center">
          <span class="label">公司：</span>
          <el-select
            v-model="chosenCompanies"
            filterable
            multiple
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in companies"
              :key="item.id"
              :label="item.company"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="flex align-center">
          <span class="label">项目：</span>
          <el-select
            v-model="params.project"
            filterable
            default-first-option
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in projects"
              :key="item.id"
              :value="item.project"
            >
            </el-option>
          </el-select>
          <!-- <el-autocomplete
            v-model="params.project"
            size="mini"
            clearable
            placeholder="项目"
            value-key="project"
            :fetch-suggestions="filterProject"
          >
          </el-autocomplete> -->
        </el-col>
        <el-col :span="12" class="flex align-center">
          <span class="label">日期：</span>
          <el-date-picker
            v-model="params.dateTime"
            value-format="yyyy-MM-dd"
            size="mini"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
          <el-button type="success" size="mini" class="ml4" @click="search">
            查 询
          </el-button>
        </el-col>
      </el-row>
    </template>
    <template #title>
      <el-tooltip
        class="item pa1 icon-button"
        effect="dark"
        content="新增"
        placement="top"
      >
        <i class="el-icon-plus" @click="handleEditEven(null)"></i>
      </el-tooltip>
      <el-tooltip
        class="item pa1 icon-button"
        effect="dark"
        content="导出"
        placement="top"
      >
        <i class="el-icon-download" @click="handleExport"></i>
      </el-tooltip>
    </template>
    <el-table
      :data="tableData"
      border
      stripe
      size="mini"
      height="100%"
      @row-dblclick="handleEditEven"
    >
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="dateTime"
        label="时间"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="companies"
        label="公司"
        align="center"
        min-width="200"
        show-overflow-tooltip
        :formatter="formatterCompanies"
      ></el-table-column>
      <el-table-column
        prop="project"
        label="项目"
        align="center"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="cause"
        label="事由"
        min-width="200"
        header-align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="sealContents"
        label="文件类型"
        align="center"
        width="100"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="copies" label="份数" align="center" width="100">
      </el-table-column>
      <el-table-column
        prop="transactor"
        label="经办人"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="department"
        label="所属部门"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="partyB"
        label="对方单位"
        header-align="center"
        min-width="200"
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        header-align="center"
        min-width="200"
      >
      </el-table-column>
    </el-table>
    <RegisterForm
      :visible.sync="visible"
      :data="currentRow"
      :isAdd="isAdd"
      @reload="search"
    ></RegisterForm>
  </Layout>
</template>
<script>
const { Op } = require("sequelize");
const Register = require("@/models/RegisterModel");
const Company = require("@/models/CompanyModel");
const { ipcRenderer } = require("electron");
import moment from "moment";
import pickerOptins from "@/mixins/pickerOptions";
import Layout from "@/components/Layout";
import RegisterForm from "@/components/RegisterForm";
export default {
  name: "Register",

  components: {
    Layout,
    RegisterForm
  },

  mixins: [pickerOptins],

  computed: {
    companies() {
      return this.$store.state.companies;
    },
    projects() {
      return this.$store.state.projects;
    }
  },

  data() {
    return {
      visible: false,
      isAdd: false,
      params: {
        project: "",
        dateTime: []
      },
      chosenCompanies: [],
      tableData: [],
      currentRow: {}
    };
  },

  mounted() {
    this.search();
  },

  methods: {
    search() {
      const params = this.handleParams(this.params);
      const include = {
        model: Company,
        where: {
          id: {
            [Op.or]: this.chosenCompanies
          }
        },
        attributes: ["id", "company"],
        through: { attributes: [] }
      };
      Register.findAll({
        include,
        where: params,
        order: [["dateTime", "DESC"]]
      })
        .then(res => {
          console.log(res);
          this.tableData = res;
        })
        .catch(error => {
          console.log(error);
          this.$message.error(error.message);
        });
    },
    handleEditEven(row) {
      this.currentRow =
        row ||
        Register.build({ dateTime: moment().format("YYYY-MM-DD"), copies: 1 });
      this.isAdd = !row;
      this.visible = true;
    },

    handleParams(obj) {
      let params = {};
      if (obj.project) {
        params.project = { [Op.substring]: obj.project };
      }
      if (obj.dateTime && obj.dateTime.length) {
        params.dateTime = {
          [Op.between]: obj.dateTime
        };
      }
      return params;
    },

    filterProject(keywords, cb) {
      if (keywords) {
        var results = this.projects.filter(data => {
          return data.project.includes(keywords);
        });
        cb(results);
      } else {
        cb(this.projects);
      }
    },

    // eslint-disable-next-line no-unused-vars
    formatterCompanies(row, column, cellValue, index) {
      let companies = Array.from(cellValue, ({ company }) => company);
      companies = companies.toString().replace(/,/g, "，");
      return companies;
    },

    handleExport() {
      ipcRenderer.send(
        "exportXLSX",
        JSON.parse(JSON.stringify(this.tableData))
      );
    }
  }
};
</script>
