import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Form, Button, Radio, Image, Input } from 'semantic-ui-react'
import Validator from 'validator'
import { withRouter } from 'react-router-dom'
import dataURItoBlob from '../../helpers/dataURItoBlob'

import blankImage from '../../img/blankImage.png'
/* eslint-disable jsx-a11y/label-has-for */
class NewTaskForm extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      text: '',
      status: 0,
      image_path: blankImage,
      imageFile: null
    },
    loading: false,
    errors: {}
  }

  componentDidMount() {
    this.props.updateTaskPreview(this.state.data)
  }

  onChange = e =>
    this.setState(
      {
        data: { ...this.state.data, [e.target.name]: e.target.value },
        errors: { ...this.state.errors, [e.target.name]: '' }
      },
      () => this.props.updateTaskPreview(this.state.data)
    )

  onImageChange = e => {
    let imageFile = e.target.files[0]
    const reader = new FileReader()

    if (imageFile) {
      reader.readAsDataURL(imageFile)
    }

    reader.onloadend = () => {
      const tempImg = document.createElement('img')
      tempImg.src = reader.result

      tempImg.onload = () => {
        const MAX_WIDTH = 320
        const MAX_HEIGHT = 240
        let { width, height } = tempImg

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
            }
          }
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(tempImg, 0, 0, width, height)
          tempImg.src = canvas.toDataURL('image/png')
          imageFile = dataURItoBlob(tempImg.src)
        }

        this.setState(
          prevState => ({
            data: { ...prevState.data, imageFile, image_path: tempImg.src },
            errors: { ...prevState.errors, imageFile: '' }
          }),
          () => this.props.updateTaskPreview(this.state.data)
        )
      }
    }
  }

  onSubmit = () => {
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        )
    }
  }

  validate = data => {
    const errors = {}
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email'
    if (!data.username) errors.username = "Can't be blank"
    if (!data.text) errors.text = "Can't be blank"
    if (!data.imageFile) errors.imageFile = "Can't be empty"
    return errors
  }

  render() {
    const { data, errors, loading } = this.state
    return (
      <Segment inverted loading={loading}>
        <Form unstackable inverted onSubmit={this.onSubmit}>
          <Form.Group
            style={{ justifyContent: 'space-between', textAlign: 'left' }}
          >
            <Form.Field required width={5} error={!!errors.username}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={errors.username || 'username...'}
                defaultValue={data.username}
                onChange={this.onChange}
              />
            </Form.Field>

            <Form.Field required width={6} error={!!errors.email}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={errors.email || 'example@example.com'}
                defaultValue={data.email}
                onChange={this.onChange}
              />
            </Form.Field>

            <Form.Group style={{ display: 'inline-block', marginRight: '5%' }}>
              <label>Status</label>
              <Form.Field
                readOnly
                control={Radio}
                label="In progress"
                checked={data.status === 0}
              />

              <Form.Field
                disabled
                control={Radio}
                label="Completed"
                checked={data.status === 10}
              />
            </Form.Group>
          </Form.Group>

          <Form.Group
            style={{ justifyContent: 'space-between', textAlign: 'left' }}
          >
            <Form.Field required width={9} error={!!errors.text}>
              <label htmlFor="text">Task Description</label>
              <Form.TextArea
                rows={13}
                name="text"
                id="text"
                placeholder={errors.text || 'Text...'}
                onChange={this.onChange}
                defaultValue={data.text}
              />
            </Form.Field>

            <Form.Field error={!!errors.imageFile} width={6}>
              <label htmlFor="file-input">
                Image
                <Image
                  src={data.image_path}
                  style={{
                    border: `4px solid ${
                      errors.imageFile ? '#9f3a38' : 'white'
                    }`,
                    marginTop: '4px'
                  }}
                />
              </label>

              <Input
                id="file-input"
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={this.onImageChange}
                style={{ display: 'none' }}
              />
            </Form.Field>
          </Form.Group>

          <Button>Add Task</Button>
        </Form>
      </Segment>
    )
  }
}

NewTaskForm.propTypes = {
  submit: PropTypes.func.isRequired,
  updateTaskPreview: PropTypes.func.isRequired
}

export default withRouter(NewTaskForm)
