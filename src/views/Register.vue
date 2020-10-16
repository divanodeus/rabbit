<template>
  <Layout
    v-loading="loading"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
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
        <i class="el-icon-plus" @click="handleEditEven()"></i>
      </el-tooltip>
      <el-tooltip
        class="item pa1 icon-button"
        effect="dark"
        content="导入"
        placement="top"
      >
        <i class="el-icon-download" @click="handleImport"></i>
      </el-tooltip>
      <el-tooltip
        class="item pa1 icon-button"
        effect="dark"
        content="导出"
        placement="top"
      >
        <i class="el-icon-upload2" @click="handleExport"></i>
      </el-tooltip>
    </template>
    <el-table
      :data="tableData"
      border
      stripe
      size="mini"
      height="100%"
      highlight-current-row
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
        label="日期"
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
        show-overflow-tooltip
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
      :model="currentRow"
      @reload="search"
    ></RegisterForm>
  </Layout>
</template>
<script>
const { ipcRenderer } = require("electron");
import { queryRegister } from "@/plugins/service";
import _dayjs from "@/plugins/dayjs";
import pickerOptins from "@/mixins/pickerOptions";
import getCompanies from "@/mixins/getCompanies";
import getProjects from "@/mixins/getProjects";
import Layout from "@/components/Layout";
import RegisterForm from "@/components/RegisterForm";
export default {
  name: "Register",

  components: {
    Layout,
    RegisterForm
  },

  mixins: [pickerOptins, getCompanies, getProjects],

  data() {
    return {
      visible: false,
      loading: false,
      loadingText: "",
      params: {
        dateTime: []
      },
      chosenCompanies: [],
      tableData: [],
      currentRow: {},
      companies: [],
      projects: []
    };
  },

  created() {
    this.params.dateTime = _dayjs.thisMonth();
    ipcRenderer.on("process_xlsx", (event, arg) => {
      if (!this.loading) this.loading = true;
      this.loadingText = arg;
    });
  },

  beforeDestroy() {
    ipcRenderer.removeAllListeners("process_xlsx");
  },

  mounted() {
    this.search();
  },

  methods: {
    search() {
      queryRegister(this.params, this.chosenCompanies)
        .then(res => {
          this.tableData = res;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },

    handleEditEven(row) {
      this.currentRow = row;
      this.visible = true;
    },

    // eslint-disable-next-line no-unused-vars
    formatterCompanies(row, column, cellValue, index) {
      let companies = Array.from(cellValue, ({ company }) => company);
      companies = companies.toString().replace(/,/g, "，");
      return companies;
    },

    handleImport() {
      ipcRenderer.invoke("importXLSX").then(res => {
        if (res) {
          ipcRenderer.once("import_success", () => {
            this.loading = false;
            this.loadingText = "";
            this.initCompanies();
            this.search();
          });
        }
      });
    },

    handleExport() {
      if (this.tableData.length) {
        const data = JSON.parse(JSON.stringify(this.tableData));
        ipcRenderer.invoke("exportXLSX", data).then(res => {
          if (res) {
            ipcRenderer.once("export_success", () => {
              this.loading = false;
              this.loadingText = "";
              this.$message.success("导出成功！");
            });
          }
        });
      } else {
        this.$message.warning("当前没有任何数据！");
      }
    }
  }
};
</script>
