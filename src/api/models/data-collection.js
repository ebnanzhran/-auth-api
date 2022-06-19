'use strict';

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  async get(food_id) {
    try {
      let record = null;
      if (food_id) {
        record = await this.model.findOne({ where: { id: food_id } });
        return record;
      }
      else {
        record = await this.model.findAll();
        return record;
      }
    } catch (e) {
      console.error("error in reading record in model ", this.model)
    }

  }

  async create(obj) {
    try {
      let newRecord = await this.model.create(obj);
      return newRecord;
    } catch (err) {
      console.error("error in creating a new record in model ", this.model)
    }
  }

  async update(obj) {
    try {
      let updated = await record.update(obj);
      return updated;
    } catch (e) {
      console.error("error in updating record in model ", this.model)
    }
  }

  async delete(food_id) {
    if (!food_id) {
      throw new Error('no id provided for model ', this.model)
    }
    try {
      let deleted = await this.model.destroy({ where: { id: food_id } });
      return deleted;
    } catch (e) {
      console.error('error in deleting record in model ', this.model);
    }
  }

}

module.exports = DataCollection;