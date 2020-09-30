<template>
  <Layout>
    <template #header>
      <el-input
        v-model="keywords"
        clearable
        placeholder="输入关键字查询"
        size="mini"
      ></el-input>
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
    </template>
    <el-table
      :data="filterData"
      stripe
      size="mini"
      height="100%"
      @row-dblclick="handleEditEven"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        v-if="this.type === 'company'"
        prop="company"
        label="公司"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="this.type === 'department'"
        prop="department"
        label="部门"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="this.type === 'project'"
        prop="project"
        label="项目"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column label="是否生效" align="center" width="100">
        <template v-slot="{ row }">
          <el-switch
            v-model="row.effective"
            @change="changeEffective(row)"
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <MaintainForm
      :type="type"
      :visible.sync="visible"
      :data="currentRow"
      :isAdd="isAdd"
      @reload="search"
    ></MaintainForm>
  </Layout>
</template>
<script>
import Layout from "@/components/Layout";
import MaintainForm from "@/components/MaintainForm";
const typeMap = {
  company: "SET_COMPANIES",
  department: "SET_DEPARTMENTS",
  project: "SET_PROJECTS"
};
export default {
  name: "CompanyManage",

  components: {
    Layout,
    MaintainForm
  },

  computed: {
    filterData() {
      if (this.keywords) {
        return this.tableData.filter(data => {
          return data[this.type].includes(this.keywords);
        });
      } else {
        return this.tableData;
      }
    }
  },

  props: {
    type: {
      type: String,
      require: true
    }
  },

  data() {
    return {
      visible: false,
      isAdd: false,
      tableData: [],
      currentRow: {},
      keywords: "",
      model: null
    };
  },

  created() {
    switch (this.type) {
      case "company":
        this.model = require("@/models/CompanyModel");
        break;
      case "department":
        this.model = require("@/models/DepartmentModel");
        break;
      case "project":
        this.model = require("@/models/ProjectModel");
        break;
      default:
        break;
    }
    if (this.model) {
      this.search();
    }
  },

  methods: {
    search() {
      this.model.findAll().then(res => {
        this.tableData = res;
        this.$store.commit(typeMap[this.type], res);
      });
    },
    handleEditEven(row) {
      this.currentRow = row || this.model.build();
      this.isAdd = !row;
      this.visible = true;
    },
    changeEffective(row) {
      row
        .save()
        .then(() => {
          this.$message.success("修改成功！");
        })
        .catch(error => {
          console.log(error);
          row.reload();
          this.$message.error("修改失败！");
        });
    }
  }
};
</script>
