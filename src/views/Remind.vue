<template>
  <el-calendar v-model="value"></el-calendar>
</template>
<script>
export default {
  name: "Remind",

  data() {
    return {
      value: new Date()
    };
  }
};
</script>
