'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchQuote,
  saveFavorite,
  unsaveFavorite
} from '@/lib/redux/quoteSlice'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, Heart } from 'lucide-react'
import Link from 'next/link'
import { AppDispatch, RootState } from '@/lib/redux/store'
import { Skeleton } from '@/components/ui/skeleton'

export default function QuotesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { quote, favorites } = useSelector((state: RootState) => state.quotes)

  useEffect(() => {
    dispatch(fetchQuote())
  }, [dispatch])

  const favQuote = favorites?.find(fav => fav.content === quote?.quote)
  const isFavorite = favQuote ? true : false

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(unsaveFavorite(favQuote!.id))
    } else {
      dispatch(saveFavorite(quote!))
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6'>
      <h1 className='mb-6 text-3xl font-bold'>Quotes Generator</h1>
      <Button
        className='px-6 py-3 text-lg hover:bg-primary/60 '
        onClick={() => dispatch(fetchQuote())}
      >
        Generate Quote
      </Button>
      {quote ? (
        <Card className='mt-6 w-full max-w-lg rounded-xl p-4 text-center shadow-lg'>
          <CardContent>
            <p className='text-xl font-semibold'>"{quote.quote}"</p>
            <p className='text-md mt-2 text-gray-500'>- {quote.author}</p>

            <div className='flex justify-end gap-x-4'>
              <div
                className={`mt-4 flex cursor-pointer items-center justify-center`}
              >
                <Heart
                  onClick={handleToggleFavorite}
                  className='h-6 w-6 text-destructive'
                  fill={isFavorite ? 'red' : 'none'}
                />
              </div>

              <div className={`mt-4 flex items-center justify-center`}>
                <Copy className='h-6 w-6' />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Skeleton className='mt-4 h-52 w-full max-w-lg rounded-md bg-secondary/50' />
      )}
      <Link
        href='/quotes/favorites'
        className='mt-6 font-bold text-primary hover:underline'
      >
        View Favorites
      </Link>
    </div>
  )
}
