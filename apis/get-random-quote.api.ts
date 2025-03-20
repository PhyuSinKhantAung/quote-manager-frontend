import api from '@/lib/axios/axios'
import { Quote, RandomQuote } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

export const getRandomQuote = async (): Promise<RandomQuote> => {
  try {
    const response = await api.get<RandomQuote>('/quotes/random')
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export const useGetRandomQuote = () =>
  useQuery({
    queryKey: ['random-quote'],
    queryFn: getRandomQuote
  })
