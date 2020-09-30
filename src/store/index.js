import Vue from "vue";
import Vuex from "vuex";
import { Message } from "element-ui";
const Company = require("@/models/CompanyModel");
const Department = require("@/models/DepartmentModel");
const Project = require("@/models/ProjectModel");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: [],
    departments: [],
    projects: []
  },
  mutations: {
    SET_COMPANIES(state, companies) {
      state.companies = companies;
    },
    SET_DEPARTMENTS(state, departments) {
      state.departments = departments;
    },
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    }
  },
  actions: {
    getCompanies({ commit }) {
      Company.findAll({
        attributes: ["id", "company"],
        where: {
          effective: true
        }
      })
        .then(companies => {
          commit("SET_COMPANIES", companies);
        })
        .catch(error => {
          console.log(error);
          Message.error(error.message);
        });
    },
    getDepartments({ commit }) {
      Department.findAll({
        attributes: ["id", "department"],
        where: {
          effective: true
        }
      })
        .then(departments => {
          commit("SET_DEPARTMENTS", departments);
        })
        .catch(error => {
          console.log(error);
          Message.error(error.message);
        });
    },
    getProjects({ commit }) {
      Project.findAll({
        attributes: ["id", "project"],
        where: {
          effective: true
        }
      })
        .then(projects => {
          commit("SET_PROJECTS", projects);
        })
        .catch(error => {
          console.log(error);
          Message.error(error.message);
        });
    }
  },
  modules: {}
});
