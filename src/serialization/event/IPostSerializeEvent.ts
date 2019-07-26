import { ISerializationModel } from '../../model/ISerializationModel';

export interface IPostSerializeEvent {
  /**
   * Original entity.
   */
  entity: {[key: string]: any};
  /**
   * Serialization model.
   */
  model: ISerializationModel;
  /**
   * Serialized entity.
   */
  serializedEntity: {[key: string]: any};
  /**
   * Serialization data store.
   */
  store?: any;
}
