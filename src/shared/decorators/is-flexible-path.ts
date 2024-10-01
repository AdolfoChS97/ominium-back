import { applyDecorators, BadRequestException } from '@nestjs/common';

export const IsFlexiblePath = () => {
  return applyDecorators((target: any, propertyKey: string) => {
    let value: string;

    // Regex actualizado para validar rutas flexibles incluyendo el formato "/:param/segment"
    const regex = /^\/(:?[a-zA-Z0-9_-]+(\/:[a-zA-Z0-9_-]+)?)+$/;

    const getter = function () {
      return value;
    };

    const setter = function (newValue: string) {
      if (typeof newValue !== 'string' || !regex.test(newValue)) {
        throw new BadRequestException(
          `${propertyKey} is not a valid flexible path. It should be a string like /segment, /segment/:id, /:id/segment, etc.`,
        );
      }
      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  });
};
