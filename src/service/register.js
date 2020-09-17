import { Op } from "sequelize";
import register from "@/model/register";

class service {
  constructor() {
    this.instance;
  }

  static getInstance() {
    this.instance = this.instance ? this.instance : new service();
    return this.instance;
  }

  findAll() {
    return register.findAll();
  }

  findAllWhere(params) {
    params = this.handleParams(params);
    return register.findAll({
      where: params
    });
  }

  handleParams(obj) {
    let params = {};
    if (obj.company) {
      params.company = { [Op.substring]: obj.company };
    }
    if (obj.project) {
      params.project = { [Op.substring]: obj.project };
    }
    if (obj.dateTime.length > 0) {
      params.dateTime = {
        [Op.gte]: obj.dateTime[0],
        [Op.lte]: obj.dateTime[1]
      };
    }
    return params;
  }
}

export default service;
