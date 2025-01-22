import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function User () {
  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [hobby, setHobby] = useState('')
  const [loading, setLoading] = useState(false)
  // navigatsiya
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    //formani yuborish
    const userData = { name, firstName, email, phone, hobby }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/users',
        userData
      )
      console.log(response)

      alert('user created successfully!')

      //formani tozalash
      setName('')
      setFirstName('')
      setEmail('')
      setPhone('')
      setHobby('')

      //navigatsiya
      if (response.status === 201) {
        navigate('/users')
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      alert('error creating user!')
    }
  }
  return (
    <>
      <div className='container w-[50%] mx-auto mt-5 '>
        <form onSubmit={handleSubmit} className='form-control'>
            <h1>Register Users CRUD</h1>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className='form-control mb-3'
          />
          <input
            type='text'
            placeholder='FirstName'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            className='form-control mb-3'
          />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className='form-control mb-3'
          />
          <input
            type='text'
            placeholder='Phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
            className='form-control mb-3'
          />
          <input
            type='text'
            placeholder='Hobby'
            value={hobby}
            onChange={e => setHobby(e.target.value)}
            required
            className='form-control mb-3'
          />
          <button type='submit' class="btn btn-primary">{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    </>
  )
}
