import { z } from 'zod'

export const addFavoriteSchema = z.object({
  content: z.string().nonempty({ message: 'Content is required' }).trim(),
  author: z.string().nonempty({ message: 'Author is required' }).trim()
})

export type AddFavoriteSchema = z.infer<typeof addFavoriteSchema>
