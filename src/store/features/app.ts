import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { capitalize, chain } from 'lodash'
import type { AppDispatch, RootState } from '../index'
import { getJackpots, loadFeed } from './../../providers/api'
import { Category, GameCategory, Jackpot } from './../../types/app'

export const OTHER_CATEGORIES_GROUP = new Set(['ball', 'virtual', 'fun'])
export const JACKPOT_CATEGORY = 'jackpot'
export const OTHER_CATEGORY = 'other'

interface CounterState {
  categories: Category[]
  selectedCategoryId: string
  jackpots: Jackpot[]
  games: GameCategory[]
  isLoading: boolean
}

const initialState: CounterState = {
  categories: [],
  selectedCategoryId: '',
  jackpots: [],
  games: [],
  isLoading: true
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialLoad: (
      state,
      action: PayloadAction<{
        categories: Category[]
        games: GameCategory[]
      }>
    ) => {
      return {
        ...state,
        categories: action.payload.categories,
        games: action.payload.games,
        isLoading: false
      }
    },
    setSelectedCategoryId: (state, action: PayloadAction<Category['id']>) => {
      state.selectedCategoryId = action.payload
    },
    setJackpots: (state, action: PayloadAction<Jackpot[]>) => {
      state.jackpots = action.payload
    }
  }
})

export const fetchGames =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const actions = appSlice.actions

    loadFeed().then(({ data }) => {
      const categories = chain(data)
        .flatMap('categories')
        .uniq()
        .filter((slug: string) => !OTHER_CATEGORIES_GROUP.has(slug))
        .map(slug => ({
          id: slug as string,
          name: capitalize(slug)
        }))
        .value()

      categories.push(
        {
          id: OTHER_CATEGORY,
          name: 'Other'
        },
        {
          id: JACKPOT_CATEGORY,
          name: 'Jackpots'
        }
      )

      const state = getState()

      if (!state.app.selectedCategoryId) {
        dispatch(requestSelectCategory('new'))
      }

      const payload = {
        games: data,
        categories
      }
      dispatch(actions.setInitialLoad(payload))
    })
  }

export const fetchJackpots = () => (dispatch: AppDispatch) => {
  const actions = appSlice.actions

  getJackpots().then(({ data }) => {
    dispatch(actions.setJackpots(data))
  })
}

export const requestSelectCategory =
  (category: Category['id']) => (dispatch: AppDispatch) => {
    dispatch(appSlice.actions.setSelectedCategoryId(category))
  }

export const selectCategories = (state: RootState) => state.app.categories
export const selectGames = (state: RootState) => state.app.games
export const selectIsLoading = (state: RootState) => state.app.isLoading
export const selectJackpots = (state: RootState) => state.app.jackpots
export const selectSelectedCategoryId = (state: RootState) =>
  state.app.selectedCategoryId

export default appSlice.reducer
