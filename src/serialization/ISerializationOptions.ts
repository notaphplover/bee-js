export interface ISerializationOptions {
  /**
   * Serialization groups.
   */
  groups?: string[];
  /**
   * Maximun serialization depth.
   */
  maxDepth?: number;
  /**
   * Serialization data store.
   */
  store?: any;
}
