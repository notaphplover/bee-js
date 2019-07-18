import { EntityTest } from './EntityTest';

export class EntityTestWrapper {
  /**
   * Inner entity.
   */
  protected _innerEntity: EntityTest;

  /**
   * Creates a new entity test wrapper.
   * @param innerEntity Inner entity.
   */
  public constructor(innerEntity: EntityTest) {
    this._innerEntity = innerEntity;
  }

  /**
   * Inner entity.
   */
  public get innerEntity(): EntityTest {
    return this._innerEntity;
  }
}
