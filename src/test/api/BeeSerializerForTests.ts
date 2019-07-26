import { BeeSerializer } from '../../api/BeeSerializer';
import { ISerializationModel } from '../../model/ISerializationModel';
import { IEntityResolver } from '../../resolver/IEntityResolver';
import { ISerializer } from '../../serialization/ISerializer';

export class BeeSerializerForTests extends BeeSerializer {

  /**
   * Inner serializer.
   */
  public get innerSerializer(): ISerializer {
    return this._serializer;
  }

  /**
   * Entity resolver.
   */
  public get resolver(): IEntityResolver {
    return this._resolver;
  }

  /**
   * Returns the models added to the serializer.
   */
  public getModels(): Iterable<ISerializationModel> {
    return this._typeToModel.values();
  }
}
