import { Layout, Menu } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  selectCategories,
  requestSelectCategory,
  selectSelectedCategoryId
} from '../store/features/app'
import { Category } from '../types/app'
import './Header.css'

const { Header } = Layout

export default function () {
  const dispatch = useAppDispatch()

  const items = useAppSelector(selectCategories).map(item => ({
    key: item.id,
    label: item.name
  }))

  const onSelectCategory = (key: Category['id']) => {
    dispatch(requestSelectCategory(key))
  }

  const selectedCategoryId = useAppSelector(selectSelectedCategoryId)

  if (!items.length) {
    return null
  }

  return (
    <Header className="fixed w-full" style={{ zIndex: 5 }}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[selectedCategoryId]}
        items={items}
        onClick={info => {
          onSelectCategory(info.key)
        }}
      />
    </Header>
  )
}
