export type AuthApiResponse = {
  message: string
  token: string
}

export type RandomQuote = {
  id: number
  quote: string
  author: string
}

export type Quote = {
  id: string
  content: string
  author: string
  createdAt: string | Date
  updatedAt: string | Date
  userId: string
}
