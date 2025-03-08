import "reflect-metadata";

type Interceptor = {
  before?: (...args: any[]) => void | Promise<void>;
  after?: (result: any) => void | Promise<void>;
};

export function Intercept(interceptor: Interceptor[] | Interceptor) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    console.log("Intercept", target, propertyKey, descriptor);

    // Reflect.defineMetadata('path', path, target, propertyKey);
    // Reflect.defineMetadata('method', 'POST', target, propertyKey);
    // Reflect.defineMetadata('interceptors', interceptors, target, propertyKey);
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== "function") {
      throw new Error("@Intercept can only be used on methods.");
    }

    const interceptors: Interceptor[] = !Array.isArray(interceptor)
      ? [interceptor]
      : interceptor;

    descriptor.value = async function (...args: any[]) {
      for (const interceptor of interceptors) {
        if (interceptor.before) {
          await interceptor.before(...args);
        }
      }
      const result = await originalMethod.apply(this, args);
      for (const interceptor of interceptors.reverse()) {
        if (interceptor.after) {
          await interceptor.after(result);
        }
      }
      return result;
    };
  };
}
