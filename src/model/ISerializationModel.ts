import { ISerializationModelProperty } from './ISerializationModelPropery';

export interface ISerializationModel {
  /**
   * Serialization properties.
   */
  properties: ISerializationModelProperty[];
  /**
   * Type managed by this model.
   */
  type: Function;
}
