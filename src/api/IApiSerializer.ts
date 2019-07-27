import { ISerializationModel } from '../model/ISerializationModel';
import { ISerializationOptions } from '../serialization/ISerializationOptions';
import {
  SerializableType,
  TransformType,
} from '../serialization/ISerializer';

export interface IApiSerializer {
  /**
   * Adds a serialization model.
   * @param model Model to add.
   */
  add(model: ISerializationModel): this;
  /**
   * Transforms an object in to another one in order to be serialized.
   * @param entity Entity to be serialized.
   * @param options Serialization options.
   */
  transform<T extends SerializableType>(
    entity: T,
    options?: ISerializationOptions,
  ): TransformType<T>;
}
