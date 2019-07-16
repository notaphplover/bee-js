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
      this._itMustInferAnEntityType();
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

  private _itMustInferAnEntityType(): void {
    it(this._itMustInferAnEntityType.name, async (done) => {
      const testType = function(innerString: string) {
        this.innerString = innerString;
      } as unknown as new (innerString: string) => any;

      const testTypeInstance = new testType('');
      const inferenceAlgorithm = new CtorInferenceAlgorithm();

      expect(inferenceAlgorithm.apply(testTypeInstance)).toBe(testType);
      done();
    }, MAX_SAFE_TIMEOUT);
  }
}
