import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'Nombre demasiado largo'),
  email: z
    .string()
    .email('Ingresa un correo electrónico válido'),
  subject: z
    .string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(120, 'Asunto demasiado largo'),
  message: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
