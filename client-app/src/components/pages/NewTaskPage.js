import React from 'react'
import { Divider } from 'semantic-ui-react'
import axios from 'axios'
import PropTypes from 'prop-types'

import NewTaskForm from '../forms/NewTaskForm'
import TaskCard from '../cards/TaskCard'

class NewTaskPage extends React.Component {
  state = {
    data: {}
  }

  onSubmit = data => {
    const payload = new FormData()
    payload.append('username', data.username)
    payload.append('email', data.email)
    payload.append('text', data.text)
    payload.append('image', data.imageFile)

    return axios
      .post(
        'https://uxcandy.com/~shapoval/test-task-backend/create?developer=KonstantinTrigub',
        payload
      )
      .then(() => this.props.history.goBack())
  }

  updateTaskPreview = taskData => this.setState({ data: taskData })

  render() {
    return (
      <div>
        <Divider section horizontal>
          ADD NEW TASK
        </Divider>
        <NewTaskForm
          submit={this.onSubmit}
          updateTaskPreview={this.updateTaskPreview}
        />
        <Divider section horizontal>
          PREVIEW
        </Divider>
        <TaskCard task={this.state.data} />
      </div>
    )
  }
}
NewTaskPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

export default NewTaskPage
