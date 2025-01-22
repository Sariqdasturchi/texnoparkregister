import React from 'react'
import User from './components/user'
import UserList from './components/userList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<User />} />
          <Route path='/users' element={<UserList />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
