export interface IInferenceAlgorithm {
  /**
   * Applies the inference algorithm to an entity.
   * @param entity Entity to apply the algorithm.
   * @returns Entity type.
   *
   * - A null returning value represents that the entity is not a serialization entity.
   * - An undefined returning value represents that the algorithm is unable to know the entity's type.
   */
  apply(entity: object): Function;
}
