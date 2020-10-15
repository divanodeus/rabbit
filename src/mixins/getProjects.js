import { queryProjectsWithSelect } from "@/plugins/service";

const getProjects = {
  data() {
    return {
      projects: []
    };
  },

  created() {
    queryProjectsWithSelect()
      .then(projects => {
        this.projects = projects;
      })
      .catch(error => {
        console.log(error);
        this.$message.error(error.message);
      });
  }
};

export default getProjects;
