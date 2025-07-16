import { z } from 'zod';
import { validateCPF } from '../utils/validators';

export const customerSchema = z.object({
  cpf: z.string()
    .length(11, { message: 'CPF must have exactly 11 digits' })
    .regex(/^\d+$/, { message: 'CPF must contain only digits' })
    .refine(validateCPF, { message: 'Invalid CPF (check digit failed)' }),

  name: z.string()
    .min(3, { message: 'Name must be at least 3 characters' }),
});