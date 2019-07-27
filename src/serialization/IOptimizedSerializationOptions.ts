export interface IOptimizedSerializationOptions {
  /**
   * Serialization groups.
   */
  groups: Set<string>;
  /**
   * Maximun serialization depth.
   */
  maxDepth?: number;
  /**
   * Serialization data store.
   */
  store?: any;
}
