import { ISerializationModel } from '../../model/ISerializationModel';
import { IEntityResolver } from '../../resolver/IEntityResolver';
import { Serializer } from '../../serialization/Serializer';
import { ITest } from '../ITest';
import {
  entityTestModel,
  entityTestModelWithGroups,
  entityTestModelWithNumField,
  entityTestModelWithStrField,
} from '../model/EntityTestModel';
import { entityTestWrapperModel } from '../model/EntityTestWrapperModel';
import { EntityTest } from '../type/EntityTest';
import { EntityTestWrapper } from '../type/EntityTestWrapper';

export class SerializerTest implements ITest {

  /**
   * Describe name of the tests.
   */
  protected _describeName: string;

  public constructor() {
    this._describeName = SerializerTest.name;
  }

  public performTests(): void {
    describe(this._describeName, () => {
      this._itMustBeInitializable();
      this._itMustNotSerializeAFieldIfItsNotInTheModel();
      this._itMustNotSerializeAFunction();
      this._itMustReturnAnEmptyObjectAtZeroDepth();
      this._itMustReturnAnEmptyObjectIfNoModelIsFound();
      this._itMustSerializeAComplexObject();
      this._itMustSerializeAComplexObjectWithDepth();
      this._itMustSerializeAPrimitiveTypeValue();
      this._itMustSerializeASimpleObject();
      this._itMustSerializeASimpleObjectWithGroups();
      this._itMustSerializeAnIterableObject();
      this._itMustSubscribePostSerializeListeners();
    });
  }

  private _itMustBeInitializable(): void {
    it(this._itMustBeInitializable.name, async (done) => {
      expect(() => {
        // tslint:disable-next-line:no-unused-expression
        new Serializer();
      }).not.toThrowError();
      done();
    });
  }

  private _itMustNotSerializeAFieldIfItsNotInTheModel(): void {
    it(this._itMustNotSerializeAFieldIfItsNotInTheModel.name, async (done) => {
      const serializer = new Serializer();
      const resolverNumField: IEntityResolver = {
        apply: () => entityTestModelWithNumField,
      };
      const resolverStrField: IEntityResolver = {
        apply: () => entityTestModelWithStrField,
      };
      const entity = new EntityTest(1, 'one');
      const resultNumField = serializer.transform(
        entity,
        resolverNumField,
        { groups: new Set() },
      );
      const resultStrField = serializer.transform(
        entity,
        resolverStrField,
        { groups: new Set() },
      );

      expect(resultNumField).toEqual({
        numField: entity.numField,
      });
      expect(resultStrField).toEqual({
        strField: entity.strField,
      });
      done();
    });
  }

  private _itMustNotSerializeAFunction(): void {
    it(this._itMustNotSerializeAFunction.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: () => { throw new Error('Unexpected call'); },
      };
      expect(
        () => serializer.transform(
          () => null,
          resolver,
          { groups: new Set() },
        ),
      ).toThrowError();
      done();
    });
  }

  private _itMustReturnAnEmptyObjectAtZeroDepth(): void {
    it(this._itMustReturnAnEmptyObjectAtZeroDepth.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: () => entityTestModel,
      };
      const entity = new EntityTest(1, 'one');
      const result = serializer.transform(
        entity,
        resolver,
        { groups: new Set(), maxDepth: 0 },
      );

      expect(result).toEqual({});
      done();
    });
  }

  private _itMustReturnAnEmptyObjectIfNoModelIsFound(): void {
    it(this._itMustReturnAnEmptyObjectIfNoModelIsFound.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: () => null,
      };
      const entity = new EntityTest(1, 'one');
      const result = serializer.transform(
        entity,
        resolver,
        { groups: new Set() },
      );

      expect(result).toEqual({});
      done();
    });
  }

  private _itMustSerializeAPrimitiveTypeValue(): void {
    it(this._itMustSerializeAPrimitiveTypeValue.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: () => { throw new Error('Unexpected call!'); },
      };
      expect(serializer.transform(1, resolver, { groups: new Set() })).toBe(1);
      expect(serializer.transform('1', resolver, { groups: new Set() })).toBe('1');
      done();
    });
  }

  private _itMustSerializeAComplexObject(): void {
    it(this._itMustSerializeAComplexObject.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: (entity) => entity instanceof EntityTestWrapper ?
          entityTestWrapperModel :
          entityTestModel,
      };
      const wrapper = new EntityTestWrapper(new EntityTest(1, 'three'));
      const serializedWrapper = serializer.transform(wrapper, resolver, { groups: new Set() });

      expect(serializedWrapper).toEqual({
        innerEntity: {
          numField: wrapper.innerEntity.numField,
          strField: wrapper.innerEntity.strField,
        },
      });
      done();
    });
  }

  private _itMustSerializeAComplexObjectWithDepth(): void {
    it(this._itMustSerializeAComplexObject.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: (entity) => entity instanceof EntityTestWrapper ?
          entityTestWrapperModel :
          entityTestModel,
      };
      const wrapper = new EntityTestWrapper(new EntityTest(1, 'three'));
      const serializedWrapper = serializer.transform(
        wrapper,
        resolver,
        { groups: new Set(), maxDepth: 1 },
      );

      expect(serializedWrapper).toEqual({
        innerEntity: {},
      });
      done();
    });
  }

  private _itMustSerializeASimpleObject(): void {
    it(this._itMustSerializeASimpleObject.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: () => entityTestModel,
      };
      const entity = new EntityTest(1, 'one');
      const result = serializer.transform(
        entity,
        resolver,
        { groups: new Set() },
      );

      expect(result).toEqual({
        numField: entity.numField,
        strField: entity.strField,
      });
      done();
    });
  }

  private _itMustSerializeASimpleObjectWithGroups(): void {
    it(this._itMustSerializeASimpleObjectWithGroups.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: () => entityTestModelWithGroups,
      };
      const entity = new EntityTest(1, 'one');
      const resultNumField = serializer.transform(
        entity,
        resolver,
        { groups: new Set(['num']) },
      );
      const resultStrField = serializer.transform(
        entity,
        resolver,
        { groups: new Set(['str']) },
      );

      expect(resultNumField).toEqual({
        numField: entity.numField,
      });
      expect(resultStrField).toEqual({
        strField: entity.strField,
      });
      done();
    });
  }

  private _itMustSerializeAnIterableObject(): void {
    it(this._itMustSerializeAnIterableObject.name, async (done) => {
      const serializer = new Serializer();
      const resolver: IEntityResolver = {
        apply: () => null,
      };
      const result = serializer.transform(new Set([1, 2, 3]), resolver, { groups: new Set()});
      expect(result).toEqual([1, 2, 3]);
      done();
    });
  }

  private _itMustSubscribePostSerializeListeners(): void {
    it(this._itMustSubscribePostSerializeListeners.name, async (done) => {
      const serializer = new Serializer();
      let entityFound: {[key: string]: any} = null;
      let modelFound: ISerializationModel = null;
      let serializedEntityFound: {[key: string]: any} = null;
      let dataStore: any = null;
      serializer.addPostSerializeListener((event) => {
        entityFound = event.entity;
        modelFound = event.model;
        serializedEntityFound = event.serializedEntity;
        dataStore = event.store;
      });
      const resolver: IEntityResolver = {
        apply: () => entityTestModel,
      };
      const entity = new EntityTest(1, 'one');
      const store = { sampleKey: 'sampleValue' };
      const result = serializer.transform(
        entity,
        resolver,
        {
          groups: new Set(),
          store: store,
        },
      );

      expect(entityFound).toBe(entity);
      expect(modelFound).toBe(entityTestModel);
      expect(serializedEntityFound).toBe(result);
      expect(dataStore).toEqual(store);
      done();
    });
  }
}
