import { Layout, Spin } from 'antd'
import React, { FC, useEffect } from 'react'
import './App.css'
import GameList from './components/Game/GameList'
import Header from './components/Header'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  fetchGames,
  fetchJackpots,
  selectIsLoading
} from './store/features/app'

const { Content } = Layout

const App: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchGames())

    const dispatchFetchJackpots = () => {
      dispatch(fetchJackpots())
    }

    const executor = setInterval(dispatchFetchJackpots, 3000)

    dispatchFetchJackpots()

    return () => {
      clearInterval(executor)
    }
  }, [])

  const isLoading = useAppSelector(selectIsLoading)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <Layout>
      <Header />
      <Content className="pt-[50px]">
        <GameList />
      </Content>
    </Layout>
  )
}

export default App
