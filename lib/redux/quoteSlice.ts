import { addFavorite, removeFavorite } from '@/apis/favourite-quote.api'
import { getRandomQuote } from '@/apis/get-random-quote.api'
import { Quote, RandomQuote } from '@/types'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface QuoteState {
  quote: RandomQuote | null
  favorites: Quote[]
  error: string | null
}

const initialState: QuoteState = {
  quote: null,
  favorites: [],
  error: null
}

export const fetchQuote = createAsyncThunk<RandomQuote, void>(
  'quotes/fetchQuote',
  async (_, { rejectWithValue }) => {
    try {
      return await getRandomQuote()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const saveFavorite = createAsyncThunk(
  'quotes/saveFavorite',
  async (quote: RandomQuote, { rejectWithValue }) => {
    try {
      const response = await addFavorite({
        content: quote.quote,
        author: quote.author
      })
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const unsaveFavorite = createAsyncThunk(
  'quotes/unsaveFavorite',
  async (quoteId: string, { rejectWithValue }) => {
    try {
      const response = await removeFavorite(quoteId)
      return response
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    saveQuote: (state, action: PayloadAction<Quote>) => {
      if (!state.favorites.some(q => q.id === action.payload.id)) {
        state.favorites.push(action.payload)
      }
    },
    unSaveQuote: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(q => q.id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.quote = action.payload
        state.error = null
      })
      .addCase(fetchQuote.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(saveFavorite.fulfilled, (state, action) => {
        if (!state.favorites.some(q => q.id === action.payload.id)) {
          state.favorites.push(action.payload)
        }
        state.error = null
      })
      .addCase(unsaveFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          q => q.id !== action.payload.id
        )
        state.error = null
      })
      .addCase(saveFavorite.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(unsaveFavorite.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export const { saveQuote, unSaveQuote } = quoteSlice.actions
export default quoteSlice.reducer
