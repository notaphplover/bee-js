import { CtorInferenceAlgorithmTest } from './inference/CtorInferenceAlgorithmTest';
import { ITest } from './ITest';

export class AllTest implements ITest {
  public performTests(): void {
    new CtorInferenceAlgorithmTest().performTests();
  }
}
