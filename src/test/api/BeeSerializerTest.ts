import { BeeSerializer } from '../../api/BeeSerializer';
import { ISerializationModel } from '../../model/ISerializationModel';
import { ITest } from '../ITest';
import {
  entityTestModel,
} from '../model/EntityTestModel';
import { EntityTest } from '../type/EntityTest';
import { BeeSerializerForTests } from './BeeSerializerForTests';

export class BeeSerialzerTest implements ITest {

  public performTests(): void {
    describe(BeeSerialzerTest.name, () => {
      this._itMustAddSerializationModels();
      this._itMustBeInitializable();
      this._itMustCallInnerSerializer();
      this._itMustNotAddAnExistingModel();
    });
  }

  private _itMustAddSerializationModels(): void {
    it(this._itMustAddSerializationModels.name, async (done) => {
      const serializer = new BeeSerializerForTests();
      const model: ISerializationModel = entityTestModel;
      serializer.add(model);
      expect([...serializer.getModels()]).toContain(model);
      done();
    });
  }

  private _itMustBeInitializable(): void {
    it(this._itMustBeInitializable.name, async (done) => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new BeeSerializer();
      }).not.toThrowError();
      done();
    });
  }

  private _itMustCallInnerSerializer(): void {
    it(this._itMustCallInnerSerializer.name, async (done) => {
      const serializer = new BeeSerializerForTests();
      const innerSerializer = serializer.innerSerializer;
      const model: ISerializationModel = entityTestModel;
      serializer.add(model);

      spyOn(innerSerializer, 'transform').and.callThrough();

      const entity = new EntityTest(0, 'zero');

      const serializationResult = serializer.transform(entity);

      expect(innerSerializer.transform).toHaveBeenCalled();
      expect(innerSerializer.transform(
        entity,
        serializer.resolver,
        { groups: new Set() },
      )).toEqual(serializationResult);

      done();
    });
  }

  private _itMustNotAddAnExistingModel(): void {
    it(this._itMustNotAddAnExistingModel.name, async (done) => {
      const serializer = new BeeSerializerForTests();
      const model: ISerializationModel = entityTestModel;
      expect(() => serializer.add(model).add(model)).toThrowError();
      done();
    });
  }
}
