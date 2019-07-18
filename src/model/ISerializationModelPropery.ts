export interface ISerializationModelProperty {
  /**
   * Property's name.
   */
  name: string;
  /**
   * Serialization groups associated.
   *
   * At least one of the serialization groups is required in the
   * serialization context in order to serialize this field.
   */
  groups?: string[];
  /**
   * Serialized name.
   */
  serialized_name?: string;
}
