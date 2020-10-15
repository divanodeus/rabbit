<template>
  <Layout>
    <template #title>
      <el-tooltip
        class="item pa1 icon-button"
        effect="dark"
        content="新增"
        placement="top"
      >
        <i class="el-icon-plus" @click="handleEditEven()"></i>
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
      <el-table-column prop="name" align="center">
        <template #header>
          <div class="flex justify-center align-center">
            <span class="mr4">{{ name }}</span>
            <span>
              <el-input
                v-model="keywords"
                clearable
                placeholder="输入关键字查询"
                size="mini"
              ></el-input>
            </span>
          </div>
        </template>
      </el-table-column>
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
      <el-table-column label="操作" align="center" width="100">
        <template v-slot="{ row }">
          <el-button
            v-if="type === 'company'"
            size="mini"
            type="text"
            @click="beforeMerge(row)"
          >
            合并数据
          </el-button>
          <el-button v-else size="mini" type="text" @click="deleteRow(row)">
            删 除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <MaintainForm
      :type="type"
      :visible.sync="visible"
      :data="currentRow"
      @reload="search"
    ></MaintainForm>
    <MergeDialog
      :type="type"
      :visible.sync="mergeVisible"
      :mergeArray="mergeModels"
      :currentData="currentRow"
      @confirm="merge"
    ></MergeDialog>
  </Layout>
</template>
<script>
import { getModel, querySimilar, mergeRepeat } from "@/plugins/service";
import Layout from "@/components/Layout";
import MaintainForm from "@/components/MaintainForm";
import MergeDialog from "@/components/MergeDialog";
export default {
  name: "CompanyManage",

  components: {
    Layout,
    MaintainForm,
    MergeDialog
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
    },
    name() {
      const typeMap = {
        company: "公司",
        department: "部门",
        project: "项目"
      };
      return typeMap[this.type];
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
      mergeVisible: false,
      tableData: [],
      currentRow: {},
      keywords: "",
      model: null,
      mergeModels: []
    };
  },

  created() {
    this.model = getModel(this.type);
    if (this.model) {
      this.search();
    }
  },

  methods: {
    search() {
      this.model
        .findAll({
          order: [["pinyin", "ASC"]]
        })
        .then(res => {
          this.tableData = res;
        });
    },
    handleEditEven(row) {
      this.currentRow = row || this.model.build();
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
    },
    beforeMerge(row) {
      this.currentRow = row;
      querySimilar(this.model, this.type, row[this.type]).then(res => {
        if (res.length) {
          this.mergeModels = res;
          this.mergeVisible = true;
        } else {
          this.$message.info(`没有找到与 ${row[this.type]} 名称相似的公司`);
        }
      });
    },
    merge(id) {
      const t = mergeRepeat(this.currentRow.id, id);
      t.then(() => {
        this.search();
        this.$message.success("合并数据成功！");
        this.mergeVisible = false;
      }).catch(err => {
        this.$message.error(err.message);
      });
    },
    deleteRow(row) {
      this.$confirm(
        `请确认是否删除 [ ${row.name} ] ？，删除本数据仅影响智能提示，不会对登记数据造成影响`,
        "警告",
        {
          type: "warning"
        }
      ).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
