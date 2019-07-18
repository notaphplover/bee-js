import { ISerializationModel } from '../model/ISerializationModel';
import { ISerializationModelProperty } from '../model/ISerializationModelPropery';
import { IEntityResolver } from '../resolver/IEntityResolver';
import { IOptimizedSerializationOptions } from './IOptimizedSerializationOptions';
import {
  ISerializer,
  SerializableType,
  SimpleSerializableType,
  TransformType,
} from './ISerializer';

export class Serializer implements ISerializer {

  /**
   * @inheritdoc
   */
  public transform<T extends SerializableType>(
    entity: T,
    resolver: IEntityResolver,
    options: IOptimizedSerializationOptions,
  ): TransformType<T> {
    if ('function' === typeof entity) {
      throw new Error('Unexpected function.');
    }
    if (null == entity || 'object' !== typeof entity) {
      return entity as TransformType<T>;
    }
    if (0 >= options.maxDepth) {
      return {} as TransformType<T>;
    }
    const model = resolver.apply(entity as {[key: string]: any});

    if (null == model) {
      if (typeof (entity as { [key: string]: any })[Symbol.iterator as any] === 'function') {
        return this._transformMissingIterable(
          entity as Iterable<SimpleSerializableType>,
          resolver,
          options,
        ) as TransformType<T>;
      } else {
        return {} as TransformType<T>;
      }
    } else {
      return this._transformWithKnownModel(
        entity as {[key: string]: any},
        model,
        resolver,
        options,
      ) as TransformType<T>;
    }
  }

  /**
   * Creates serialization options for a child entity.
   * @param options Serialization options.
   * @returns Serialization options for a child entity.
   */
  private _createSerializationOptionsForChild(options: IOptimizedSerializationOptions): IOptimizedSerializationOptions {
    const newOptions = Object.assign({}, options);
    if (undefined !== newOptions.maxDepth) {
      --newOptions.maxDepth;
    }
    return newOptions;
  }

  /**
   * Determines if a property should be excluded.
   * @param property Property to be excluded.
   * @param groups Serialization groups.
   * @returns true if the property should be excluded.
   */
  private _propertyShouldBeExcluded(
    property: ISerializationModelProperty,
    groups: Set<string>,
  ): boolean {
    if (!property.groups) {
      return false;
    }
    for (const group of property.groups) {
      if (groups.has(group)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Serializes an iterable entity not defined as a serialization model.
   * @param entity Entity to be serialized.
   * @param resolver Model resolver.
   * @param options Serialization options.
   * @returns Serialized entity.
   */
  private _transformMissingIterable<T extends SimpleSerializableType>(
    entity: Iterable<T>,
    resolver: IEntityResolver,
    options: IOptimizedSerializationOptions,
  ): TransformType<Iterable<T>> {
    const serializedEntity = new Array();
    for (const element of entity) {
      const newOptions = this._createSerializationOptionsForChild(options);
      serializedEntity.push(this.transform(element, resolver, newOptions));
    }
    return serializedEntity;
  }

  /**
   * Transforms an entity with a known serialization model.
   * @param entity Entity to be serialized.
   * @param model Model found for the entity.
   * @param resolver Entity resolver.
   * @param options Serialization options.
   */
  private _transformWithKnownModel(
    entity: {[key: string]: any},
    model: ISerializationModel,
    resolver: IEntityResolver,
    options: IOptimizedSerializationOptions,
  ): TransformType<{[key: string]: any}> {
    const serializedEntity: {[key: string]: any} = {};

    for (const property of model.properties) {
      if (this._propertyShouldBeExcluded(property, options.groups)) {
        continue;
      }
      const newOptions = this._createSerializationOptionsForChild(options);
      serializedEntity[property.serialized_name || property.name] = this.transform(
        entity[property.name],
        resolver,
        newOptions,
      );
    }

    return serializedEntity;
  }
}
