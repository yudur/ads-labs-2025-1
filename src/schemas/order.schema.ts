import { z } from 'zod';

export const orderSchema = z.object({
  customerId: z.string().uuid('customerId must be a valid UUID'),
  dishId: z.string().uuid('dishId must be a valid UUID'),
  quantity: z.number({ invalid_type_error: 'Quantity must be a number' })
    .min(1)
    .int('Quantity must be an integer')
    .positive('Quantity must be greater than zero'),
});
