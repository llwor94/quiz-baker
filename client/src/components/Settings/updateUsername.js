import React, { useState, useContext } from 'react'
import debounce from 'lodash/debounce'

import server from 'server'

import { AuthCtx } from 'auth'

import { Button, SettingsButton } from 'styles/Components/Button'
import { Input } from 'styles/Components/Input'
import { ProfileButtonWrapper } from 'styles/Settings/Sidebar'

const checkData = debounce(async (username, setError) => {
  if (username) {
    let user = await server.get('/users', { params: { username } })

    if (user.data) {
      setError('This username is unavailable.')
    } else if (username.length < 4 || username.length > 10) {
      setError('Username must be between 4 and 10 characters.')
    } else {
      setError(undefined)
    }
  }
}, 500)

const UpdateUsername = ({ usernameUpdate, setUsernameUpdate, updateUser }) => {
  const [error, setError] = useState(undefined)
  const { user } = useContext(AuthCtx)
  const [username, setUsername] = useState(user.username)

  const handleChange = async e => {
    e.persist()
    setUsername(e.target.value)
    if (e.target.value !== user.username) {
      await checkData(e.target.value, setError)
    }
  }

  const handleUpdate = () => {
    server
      .patch('/auth/update', { newUsername: username })
      .then(response => {
        updateUser()
      })
      .catch(err => console.log(err))
  }

  if (usernameUpdate)
    return (
      <ProfileButtonWrapper>
        <Input value={username} onChange={handleChange} className="input-username" />
        {error && <p>{error}</p>}
        <div className="update-user">
          <Button
            secondary
            icon="pi pi-arrow-left"
            label="back"
            onClick={() => setUsernameUpdate(false)}
          />
          <Button
            secondary
            label="Update"
            disabled={!username || error || username === user.username}
            onClick={handleUpdate}
          />
        </div>
      </ProfileButtonWrapper>
    )
  else
    return (
      <Button
        full
        secondary
        label="Update Username?"
        style={SettingsButton}
        onClick={() => setUsernameUpdate(true)}
      />
    )
}
export default UpdateUsername
