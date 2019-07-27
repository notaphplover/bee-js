import { ISerializationModel } from '../model/ISerializationModel';

export interface IEntityResolver {
  /**
   * Determines the model associated to an entity.
   * @param entity Entity to apply the model resolution algorithm.
   */
  apply(entity: object): ISerializationModel;
}
