import { ISerializationModel } from '../model/ISerializationModel';
import { IEntityResolver } from '../resolver/IEntityResolver';
import { ISerializationOptions } from '../serialization/ISerializationOptions';
import {
  ISerializer,
  SerializableType,
  TransformType,
} from '../serialization/ISerializer';
import { Serializer } from '../serialization/Serializer';
import { IApiSerializer } from './IApiSerializer';

export class BeeSerializer implements IApiSerializer {
  /**
   * Entity resolver.
   */
  protected _resolver: IEntityResolver;
  /**
   * Inner serializer.
   */
  protected _serializer: ISerializer;
  /**
   * Type to model map.
   */
  protected _typeToModel: Map<Function, ISerializationModel>;

  /**
   * Creates a new BeeSerializer.
   */
  public constructor() {
    this._serializer = new Serializer();
    this._typeToModel = new Map();

    this._resolver = {
      apply: (entity: object) => this._typeToModel.get(entity.constructor),
    };
  }

  /**
   * @inheritdoc
   */
  public add(model: ISerializationModel): this {
    if (this._typeToModel.has(model.type)) {
      throw new Error('There is already a model defined for the type provided');
    }
    this._typeToModel.set(model.type, model);
    return this;
  }

  /**
   * @inheritdoc
   */
  public transform<T extends SerializableType>(
    entity: T,
    options: ISerializationOptions = {},
  ): TransformType<T> {
    return this
      ._serializer
      .transform(
        entity,
        this._resolver,
        {
          groups: new Set(options.groups),
          maxDepth: options.maxDepth,
        },
      );
  }
}
