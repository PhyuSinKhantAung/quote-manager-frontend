'use client'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerSchema, RegisterSchema } from '@/schemas/register.schema'
import { useRegister } from '@/apis/register.api'

const Register = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })

  const { toast } = useToast()
  const router = useRouter()

  const { mutate: login, isPending } = useRegister()
  return (
    <form
      onSubmit={form.handleSubmit(async data => {
        login(data, {
          onSuccess: data => {
            toast({
              title: 'Registered Successful',
              description: 'You registered an account successfully.'
            })
            localStorage.setItem('token', data.token)
            router.push('/quotes')
          },

          onError: error => {
            toast({
              variant: 'destructive',
              title: 'Registered Failed',
              description: error.message
            })
          }
        })
      })}
      className='flex min-h-screen items-center justify-center'
    >
      <div className='w-full max-w-sm rounded-lg bg-white p-6 shadow-md'>
        <h2 className='mb-4 text-center text-2xl font-semibold'>Register</h2>
        <div className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <Input
              id='name'
              type='text'
              placeholder='Enter your name'
              className='mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...form.register('name')}
            />
            {form?.formState?.errors?.email && (
              <p className='text-sm text-red-500'>
                {form?.formState?.errors?.name?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <Input
              id='email'
              type='email'
              placeholder='Enter your email'
              className='mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...form.register('email')}
            />
            {form?.formState?.errors?.email && (
              <p className='text-sm text-red-500'>
                {form?.formState?.errors?.email?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <Input
              id='password'
              type='password'
              placeholder='Enter your password'
              className='mt-1 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              {...form.register('password')}
            />
            {form?.formState?.errors?.password && (
              <p className='text-sm text-red-500'>
                {form?.formState?.errors?.password?.message}
              </p>
            )}
          </div>
          <Button className='my-2 w-full' disabled={isPending}>
            Register
          </Button>
          <small>Already have an account?</small>

          <Button variant='link'>
            <Link href='/login'>Login</Link>
          </Button>
        </div>
      </div>
    </form>
  )
}

export default Register
