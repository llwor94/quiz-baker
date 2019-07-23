import React from 'react'

import server from 'server'

import { openUploadWidget } from '../../utils/cloudinary'

import { Button, SettingsButton } from 'styles/Components/Button'
import { ProfileButtonWrapper } from 'styles/Settings/Sidebar'

const UpdateImage = ({ imageUpdate, setImageUpdate, updateUser }) => {
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
        server.patch('/auth/update', { newImg: result.info.secure_url }).then(response => {
          updateUser()
        })
      }
    })
  }
  if (imageUpdate)
    return (
      <ProfileButtonWrapper>
        <Button secondary label="Browse..." onClick={handleUpload} full />
        <Button
          secondary
          icon="pi pi-arrow-left"
          label="back"
          onClick={() => setImageUpdate(false)}
        />
      </ProfileButtonWrapper>
    )
  else
    return (
      <Button
        full
        style={SettingsButton}
        secondary
        label="Update Image?"
        onClick={() => setImageUpdate(true)}
      />
    )
}

export default UpdateImage
