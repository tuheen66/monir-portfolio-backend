import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(20, { message: 'Name is required' }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    email: z.string().email('Invalid email address'),
  }),
});

export const UserValidations = {
  userValidationSchema,
};
