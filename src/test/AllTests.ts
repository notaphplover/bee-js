import { BeeSerialzerTest } from './api/BeeSerializerTest';
import { ITest } from './ITest';
import { SerializerTest } from './serialization/SerializerTest';

export class AllTest implements ITest {
  public performTests(): void {
    new BeeSerialzerTest().performTests();
    new SerializerTest().performTests();
  }
}
