import api from '@/lib/axios/axios'
import { RegisterSchema } from '@/schemas/register.schema'
import { AuthApiResponse } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

export const registerUser = async (payload: RegisterSchema) => {
  try {
    const response = await api.post<AuthApiResponse>('/auth/register', payload)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Something went wrong')
    }
  }
}

export const useRegister = () =>
  useMutation({
    mutationFn: registerUser
  })
