import { ISerializationModel } from '../../model/ISerializationModel';
import { EntityTest } from '../type/EntityTest';

export const entityTestModel: ISerializationModel = {
  properties: [
    { name: 'numField' },
    { name: 'strField' },
  ],
  type: EntityTest,
};

export const entityTestModelWithGroups: ISerializationModel = {
  properties: [
    { name: 'numField', groups: ['num'] },
    { name: 'strField', groups: ['str'] },
  ],
  type: EntityTest,
};

export const entityTestModelWithNumField: ISerializationModel = {
  properties: [
    { name: 'numField' },
  ],
  type: EntityTest,
};

export const entityTestModelWithStrField: ISerializationModel = {
  properties: [
    { name: 'strField' },
  ],
  type: EntityTest,
};
