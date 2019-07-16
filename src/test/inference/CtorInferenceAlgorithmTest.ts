import { CtorInferenceAlgorithm } from '../../inference/CtorInferenceAlgorithm';
import { ITest } from '../ITest';

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

export class CtorInferenceAlgorithmTest implements ITest {
  /**
   * Describe name of the test cases.
   */
  protected _describeName: string;

  public constructor() {
    this._describeName = CtorInferenceAlgorithmTest.name;
  }

  public performTests(): void {
    describe(this._describeName, () => {
      this._itMustBeInitializable();
    });
  }

  private _itMustBeInitializable(): void {
    it(this._itMustBeInitializable.name, async (done) => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new CtorInferenceAlgorithm();
      }).not.toThrowError();
      done();
    }, MAX_SAFE_TIMEOUT);
  }
}
