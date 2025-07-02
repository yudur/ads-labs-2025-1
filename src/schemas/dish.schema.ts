import { z } from 'zod';

export const dishSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters')
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, 'Name must contain only letters'),

  price: z.number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be greater than zero'),
});
