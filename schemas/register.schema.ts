import { z } from 'zod'

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: 'Name is required'
    })
    .trim(),
  email: z
    .string()
    .nonempty({
      message: 'Email is required'
    })
    .email(),
  password: z
    .string()
    .nonempty({
      message: 'Password is required'
    })
    .trim()
    .min(6, 'Password must have at least 6 characters')
})

export type RegisterSchema = z.infer<typeof registerSchema>
