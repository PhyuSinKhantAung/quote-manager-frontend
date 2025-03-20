'use client'

import { Heart } from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import {
  useGetFavoriteQuotes,
  useRemoveFavorite
} from '@/apis/favourite-quote.api'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { Quote } from '@/types'
import { useState } from 'react'
import { Input } from '../ui/input'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export const FavoriteQuotesList = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: ''
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetFavoriteQuotes(query)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const favorites = data?.pages.flatMap(page => page.data) || []

  return (
    <>
      <div className='px-4 py-2'>
        <Input
          placeholder='Search Quotes by Author or Content'
          onChange={e => setQuery({ ...query, search: e.target.value })}
        />
      </div>
      <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-3'>
        {isLoading && (
          <div className='flex min-h-svh flex-col items-center justify-center'>
            Loading...
          </div>
        )}
        {favorites.map(quote => (
          <FavoriteCard key={quote.id} quote={quote} />
        ))}
      </div>
      <div ref={ref} className=' text-center'>
        {isFetchingNextPage && <div>Loading more...</div>}
        {!hasNextPage && !isLoading && <div>No more quotes to load</div>}
      </div>
    </>
  )
}

export const FavoriteCard = ({ quote }: { quote: Quote }) => {
  const { mutate: removeFavorite } = useRemoveFavorite()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const handleRemoveFavorite = () => {
    removeFavorite(quote.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['favorite-quotes']
        })
        toast({
          title: 'Removed Favorite',
          description: 'Quote removed from favorites'
        })
      }
    })
  }

  return (
    <Card key={quote.id} className='rounded-lg p-4 shadow-md'>
      <CardContent>
        <p className='text-lg font-semibold'>"{quote.content}"</p>
        <p className='mt-2 text-sm text-gray-500'>- {quote.author}</p>
        <div className='mt-4 flex cursor-pointer justify-end'>
          <Heart
            className='h-6 w-6 text-red-500 hover:opacity-60'
            onClick={handleRemoveFavorite}
            fill='red'
          />
        </div>
      </CardContent>
    </Card>
  )
}
