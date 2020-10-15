<template>
  <el-dialog :visible.sync="visible" :before-close="close">
    <div>
      <div class="pb4">
        已查找到{{ mergeArray.length }}项与&nbsp;[&nbsp;{{
          currentData[type]
        }}&nbsp;]&nbsp;相似的数据
      </div>
      <div>
        <el-radio-group v-model="value">
          <el-radio v-for="item of mergeArray" :key="item.id" :label="item.id">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </div>
      <div class="remind pt8" v-show="type === 'company'">
        <div class="warn pb2">
          提醒！属于 [&nbsp;{{ currentData[type] }}&nbsp;]
          的登记数据将全部调整为属于被选择的公司
        </div>
        <div class="danger">
          警告！调整完成之后该过程不可逆，[&nbsp;{{
            currentData[type]
          }}&nbsp;]&nbsp;这家公司将被删除！
        </div>
      </div>
    </div>
    <template #footer>
      <el-button size="mini" @click="close">取 消</el-button>
      <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: "MergeDialog",

  props: {
    visible: Boolean,
    type: String,
    currentData: Object,
    mergeArray: Array
  },

  data() {
    return {
      value: null
    };
  },

  methods: {
    close() {
      this.value = null;
      this.$emit("update:visible", false);
    },

    confirm() {
      this.$emit("confirm", this.value);
    }
  }
};
</script>
<style scoped>
.warn {
  color: #e6a23c;
}
.danger {
  color: #f56c6c;
}
</style>
