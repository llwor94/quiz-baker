import React, { useState, useEffect, useContext } from 'react'

import { openUploadWidget } from '../utils/cloudinary'
import server from 'server'

import { AuthCtx } from 'auth'

import { HugeImage } from 'styles/Components/Image'
import { Button } from 'styles/Components/Button'

const UploadImage = ({ doneEditting }) => {
  const { user, editUser } = useContext(AuthCtx)
  const [img_url, setImg] = useState(null)

  useEffect(() => {
    if (user.img_url) {
      setImg(user.img_url)
    }
  }, [user.img_url])

  const handleUpload = () => {
    const uploadOptions = {
      cropping: true,
      sources: ['local', 'url', 'camera'],
      multiple: false,
      croppingAspectRatio: 1,
      gravity: 'custom',
      croppingShowBackButton: false
    }
    openUploadWidget(uploadOptions, (error, result) => {
      if (result.event === 'success') {
        setImg(result.info.secure_url)
      }
    })
  }

  const handleEditUser = () => {
    let userData = JSON.parse(localStorage.getItem('user'))
    if (img_url) {
      server
        .patch('/auth/update', { newImg: img_url })
        .then(response => {
          server
            .get(`/users/${user.id}`)
            .then(({ data }) => {
              let newUser = { ...userData, user: data }
              editUser(newUser)
            })
            .then(() => doneEditting())
        })
        .catch(err => console.log(err))
    } else doneEditting()
  }

  return (
    <div>
      <HugeImage src={img_url} />

      <div>
        <Button secondary label="Browse..." onClick={handleUpload} full />

        <Button
          label={img_url ? 'done' : 'skip'}
          onClick={handleEditUser}
          white={!img_url}
          style={{ float: 'right' }}
        />
      </div>
    </div>
  )
}

export default UploadImage
