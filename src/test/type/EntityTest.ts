export class EntityTest {
  /**
   * Numeric field
   */
  protected _numField: number;
  /**
   * String field
   */
  protected _strField: string;

  /**
   * Creates a new test entity.
   * @param numField Numeric field.
   * @param strField String field.
   */
  public constructor(numField: number, strField: string) {
    this._numField = numField;
    this._strField = strField;
  }

  /**
   * Numeric field.
   */
  public get numField(): number {
    return this._numField;
  }

  /**
   * String field.
   */
  public get strField(): string {
    return this._strField;
  }
}
