import { IInferenceAlgorithm } from '../../inference/IInferenceAlgorithm';
import { InferenceChain } from '../../inference/InferenceChain';
import { ITest } from '../ITest';
import { EntityTest } from '../type/EntityTest';

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

export class InferenceChainTest implements ITest {

  /**
   * Describe name of the test cases.
   */
  protected _describeName: string;

  public constructor() {
    this._describeName = InferenceChainTest.name;
  }

  public performTests(): void {
    describe(this._describeName, () => {
      this._itMustBeInitializable();
      this._itMustInferTheSameTypeThatTheFirstAlgorithmAbleToFindAType();
      this._itMustNotInferAnEntityTypeIfNoAlgorithmsAreAbleToInferTheEntityType();
    });
  }

  private _itMustBeInitializable(): void {
    it(this._itMustBeInitializable.name, async (done) => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new InferenceChain(new Array());
      }).not.toThrowError();
      done();
    }, MAX_SAFE_TIMEOUT);
  }

  private _itMustInferTheSameTypeThatTheFirstAlgorithmAbleToFindAType(): void {
    it(this._itMustInferTheSameTypeThatTheFirstAlgorithmAbleToFindAType.name, async (done) => {
      const firstAlgorithm: IInferenceAlgorithm = {
        apply: () => undefined,
      };
      const secondAlgorithm: IInferenceAlgorithm = {
        apply: () => Number,
      };
      const thirdAlgorithm: IInferenceAlgorithm = {
        apply: () => String,
      };
      const inferenceChain = new InferenceChain([firstAlgorithm, secondAlgorithm, thirdAlgorithm]);
      expect(inferenceChain.apply({})).toBe(secondAlgorithm.apply({}));
      done();
    }, MAX_SAFE_TIMEOUT);
  }

  private _itMustNotInferAnEntityTypeIfNoAlgorithmsAreAbleToInferTheEntityType(): void {
    it(this._itMustNotInferAnEntityTypeIfNoAlgorithmsAreAbleToInferTheEntityType.name, async (done) => {
      const inferenceChain = new InferenceChain(new Array());
      const entity = new EntityTest(0, 's');
      expect(inferenceChain.apply(entity)).toBe(undefined);
      done();
    }, MAX_SAFE_TIMEOUT);
  }
}
