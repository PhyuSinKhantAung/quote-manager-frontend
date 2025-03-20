import api from '@/lib/axios/axios'
import { AddFavoriteSchema } from '@/schemas/add-favourite-quote.schema'
import { Quote } from '@/types'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

export const addFavorite = async (payload: AddFavoriteSchema) => {
  try {
    const response = await api.post(`/quotes/favorites`, payload)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export const removeFavorite = async (quoteId: string) => {
  try {
    const response = await api.delete(`/quotes/favorites/${quoteId}`)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export const useRemoveFavorite = () =>
  useMutation({
    mutationFn: removeFavorite
  })

export const getFavoriteQuotes = async (query: {
  page: number
  limit: number
  search: string
}) => {
  try {
    const response = await api.get<{ data: Quote[]; count: number }>(
      '/quotes/favorites',
      {
        params: query
      }
    )
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export const useGetFavoriteQuotes = (query: {
  page: number
  limit: number
  search: string
}) => {
  return useInfiniteQuery({
    queryKey: ['favorite-quotes', query.search],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<{ data: Quote[]; count: number }>(
        `/quotes/favorites?page=${pageParam}&limit=${query.limit}&search=${query.search}`
      )
      return response.data
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length < query.limit) return undefined
      return allPages.length + 1
    },
    initialPageParam: 1
  })
}
