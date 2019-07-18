import { ISerializationModel } from '../../model/ISerializationModel';
import { EntityTestWrapper } from '../type/EntityTestWrapper';

export const entityTestWrapperModel: ISerializationModel = {
  properties: [
    { name: 'innerEntity' },
  ],
  type: EntityTestWrapper,
};
