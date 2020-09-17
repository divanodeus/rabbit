<template>
  <div class="page flex flex-column">
    <div class="page-header pb4">
      <el-row :gutter="20">
        <el-col :span="6" class="flex align-center">
          <span class="label">公司：</span>
          <el-input
            v-model="params.company"
            size="mini"
            clearable
            placeholder="查询公司"
          >
          </el-input>
        </el-col>
        <el-col :span="6" class="flex align-center">
          <span class="label">项目：</span>
          <el-input
            v-model="params.project"
            size="mini"
            clearable
            placeholder="查询项目"
          >
          </el-input>
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
          <el-button type="primary" size="mini">导 出</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="flex-1 page-content">
      <el-table
        :data="tableData"
        border
        stripe
        size="mini"
        height="100%"
        @row-dblclick="handleDbClick"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="company"
          label="公司"
          width="150"
          header-align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cause"
          label="事由"
          width="200"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="dateTime"
          label="时间"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="transactor"
          label="经办人"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="sealContents"
          label="盖章内容"
          min-width="200"
          header-align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="copies" label="份数" width="60" align="center">
        </el-table-column>
        <el-table-column
          prop="partyB"
          label="对方单位"
          width="200"
          header-align="center"
        >
        </el-table-column>
        <el-table-column prop="project" label="项目" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="200"
          header-align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <RegisterForm
      :visible.sync="visible"
      :data="currentRow"
      @confirm="saveRow"
    ></RegisterForm>
  </div>
</template>
<script>
import service from "@/service/register";
import pickerOptins from "@/mixins/pickerOptions";
import RegisterForm from "@/components/RegisterForm";
export default {
  name: "Statement",

  components: {
    RegisterForm
  },

  mixins: [pickerOptins],

  data() {
    return {
      visible: false,
      params: {
        company: "",
        project: "",
        dateTime: []
      },
      tableData: [],
      currentRow: {}
    };
  },

  created() {
    this.service = new service();
  },

  mounted() {
    this.search();
  },

  methods: {
    async search() {
      console.log(this.params);
      this.tableData = await this.service.findAllWhere(this.params);
    },
    handleDbClick(row) {
      this.currentRow = row;
      this.visible = true;
    },
    saveRow(form) {
      this.currentRow.set(form).save();
      this.visible = false;
    }
  }
};
</script>
