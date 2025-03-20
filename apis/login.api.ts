import api from '@/lib/axios/axios'
import { LoginSchema } from '@/schemas/login.schema'
import { AuthApiResponse } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

export const loginUser = async (payload: LoginSchema) => {
  try {
    const response = await api.post<AuthApiResponse>('/auth/login', payload)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser
  })
