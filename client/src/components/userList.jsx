import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserList () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    //foydalanuvchilarni olish
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users')
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])
  return (
    <>
      <table class='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Familiya</th>
            <th scope='col'>Ism</th>
            <th scope='col'>Username</th>
            <th scope='col'>Telefon raqam</th>
            <th scope='col'>Qizig'ishi</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.phone}</td>
              <td>{user.hobby}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
