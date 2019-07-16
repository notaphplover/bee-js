import { CtorInferenceAlgorithmTest } from './inference/CtorInferenceAlgorithmTest';
import { InferenceChainTest } from './inference/InferenceChainTest';
import { ITest } from './ITest';

export class AllTest implements ITest {
  public performTests(): void {
    new CtorInferenceAlgorithmTest().performTests();
    new InferenceChainTest().performTests();
  }
}