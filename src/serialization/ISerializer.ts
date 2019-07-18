import { IEntityResolver } from '../resolver/IEntityResolver';
import { IOptimizedSerializationOptions } from './IOptimizedSerializationOptions';

export type SerializableType = SimpleSerializableType | Iterable<SimpleSerializableType>;

export type SimpleSerializableType =
  number
  | string
  | bigint
  | {[key: string]: any};

export type TransformType<T> =
  T extends Iterable<infer U> ? U[]:
    T extends number|string|bigint ? T:
      {[key: string]: any};

export interface ISerializer {
  /**
   * Transforms an object in to another one in order to be serialized.
   * @param entity Entity to be serialized.
   * @param resolver Model resolver.
   * @param options Serialization options.
   */
  transform<T extends SerializableType>(
    entity: T,
    resolver: IEntityResolver,
    options: IOptimizedSerializationOptions,
  ): TransformType<T>;
}
