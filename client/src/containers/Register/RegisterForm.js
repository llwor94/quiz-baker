import React, { useState, useContext } from 'react'
import _ from 'lodash'
import debounce from 'lodash/debounce'

import server from 'server'

import { AuthCtx } from 'auth'

import { Wrapper, InputWrap } from 'components/Auth'

const checkData = debounce(async ({ target }, setError, error) => {
  if (target.value) {
    let user = await server.get('/users', {
      params: { [target.name]: target.value }
    })

    if (user.data) {
      target.name === 'username'
        ? setError({ ...error, username: 'This username is unavailable.' })
        : setError({
            ...error,
            email: 'A user with this email address already exists.'
          })
    } else {
      setError({ ...error, [target.name]: undefined })
    }
  }
}, 500)

const RegisterForm = props => {
  const { login } = useContext(AuthCtx)
  const [userInput, setInputValue] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    passwordCheck: undefined
  })

  const [error, setError] = useState({
    username: undefined,
    email: undefined,
    password: undefined
  })

  const handleChange = async e => {
    e.persist()
    setInputValue({ ...userInput, [e.target.name]: e.target.value })
    if (e.target.name === 'username' || e.target.name === 'email') {
      await checkData(e, setError, error)
    } else if (e.target.name === 'passwordCheck') {
      if (e.target.value !== userInput.password) {
        setError({ ...error, password: 'Your passwords do not match' })
      } else {
        setError({ ...error, password: undefined })
      }
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    server
      .post('/auth/register', userInput)
      .then(({ data }) => {
        login(data)
      })
      .catch(err => console.log(err))
  }

  return (
    <Wrapper
      type="register"
      handleSubmit={handleSubmit}
      submitDisabled={_.some(userInput, _.isEmpty) || !_.every(error, _.isEmpty)}
      location={props.location}
    >
      <InputWrap
        name="email"
        type="email"
        value={userInput.email}
        handleChange={handleChange}
        placeholder="Email"
        error={error.email}
      />
      <InputWrap
        name="username"
        type="text"
        value={userInput.username}
        handleChange={handleChange}
        placeholder="Username"
        error={error.username}
      />
      <InputWrap
        name="password"
        type="password"
        value={userInput.password}
        handleChange={handleChange}
        placeholder="Password"
      />
      <InputWrap
        name="passwordCheck"
        type="password"
        value={userInput.passwordCheck}
        handleChange={handleChange}
        placeholder="Re-enter password"
        disabled={!userInput.password}
        error={error.password}
      />
    </Wrapper>
  )
}

export default RegisterForm
