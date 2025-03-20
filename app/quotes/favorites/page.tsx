import { FavoriteQuotesList } from '@/components/auth/FavoriteQuotesList'

export default function page() {
  return (
    <div className='mx-auto max-w-6xl'>
      <h1 className='p-4 text-2xl font-bold text-primary '>
        Your Favorite Quotes
      </h1>
      <FavoriteQuotesList />
    </div>
  )
}
