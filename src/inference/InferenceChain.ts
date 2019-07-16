import { IInferenceAlgorithm } from './IInferenceAlgorithm';

export class InferenceChain implements IInferenceAlgorithm {
  /**
   * Algorithms set
   */
  protected _algorithms: IInferenceAlgorithm[];

  /**
   * Creates an inference chain algorithm.
   * @param algorithms Algorithms set.
   */
  public constructor(algorithms: Iterable<IInferenceAlgorithm>) {
    this._algorithms = new Array(...algorithms);
  }

  /**
   * @inheritdoc
   */
  public apply(entity: object): Function {
    for (const algorithm of this._algorithms) {
      const type = algorithm.apply(entity);
      if (undefined !== type) {
        return type;
      }
    }
    return undefined;
  }
}
