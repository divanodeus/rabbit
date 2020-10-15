import { queryCompaniesWithSelect } from "@/plugins/service";

const getCompanies = {
  data() {
    return {
      companies: []
    };
  },

  created() {
    this.initCompanies();
  },

  methods: {
    initCompanies() {
      queryCompaniesWithSelect()
        .then(companies => {
          this.companies = companies;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  }
};

export default getCompanies;
