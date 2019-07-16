import { IInferenceAlgorithm } from './IInferenceAlgorithm';

export class CtorInferenceAlgorithm implements IInferenceAlgorithm {
  /**
   * @inheritdoc
   */
  public apply(entity: object): Function {
    return entity.constructor;
  }
}
