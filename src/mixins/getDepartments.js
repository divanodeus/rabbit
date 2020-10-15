import { queryDepartmentsWithSelect } from "@/plugins/service";

const getDepartments = {
  data() {
    return {
      departments: []
    };
  },

  created() {
    queryDepartmentsWithSelect()
      .then(departments => {
        this.departments = departments;
      })
      .catch(error => {
        console.log(error);
        this.$message.error(error.message);
      });
  }
};

export default getDepartments;
