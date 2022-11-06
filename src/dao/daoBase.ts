export interface IDaoObject {
  findAll: Function;
  findById: Function;
  findByFilter: Function;
  createOne: Function;
  update: Function;
  delete: Function;
  aggregate: Function;
}
