import { Intercept } from "./interceptor";

class ExampleService {
  @Intercept({
    before: (data: string) => {
      console.log(`[LOG] Method called with args: ${data}`);
    },
    after: (result) => {
      console.log(`[LOG] After processing: ${result}`);
    },
  })
  async processData(data: string): Promise<string> {
    console.log("processing data...");
    return `Processed: ${data}`;
  }
}

(async () => {
  const service = new ExampleService();
  const result = await service.processData("Hello, world!");
  console.log("Final result:", result);
})();
