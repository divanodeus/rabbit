<template>
  <div>
    <div>home</div>
    <div>{{ result }}</div>
  </div>
</template>
<script>
import Sqlite from "@/plugins/sqlite";
export default {
  name: "Home",

  data: () => ({
    result: null
  }),

  async mounted() {
    const db = Sqlite.getInstance();
    await db.connect();
    const response = await db.all(
      "select ID, NAME, AGE, ADDRESS, SALARY from COMPANY"
    );
    console.log(response);
    this.result = response;
    db.close();
  }
};
</script>
