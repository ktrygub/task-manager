import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import md5 from 'md5'

import AddNewTask from './AddNewTask'
import TaskSortPanel from './TaskSortPanel'
import TaskList from './TaskList'
import DashboardPagination from './DashboardPagination'

class DashboardPage extends React.Component {
  state = {
    data: {
      tasks: [],
      total: 0
    },
    sort: {
      field: '',
      direction: false
    }
  }

  componentWillMount() {
    this.getTaskPage(this.props.match.params.page)
  }

  onStatusChange = task => {
    const paramsString = `status=${task.status === 0 ? 10 : 0}&token=beejee`
    const signature = md5(paramsString)

    const payload = new FormData()
    payload.append('status', task.status === 0 ? 10 : 0)
    payload.append('token', 'beejee')
    payload.append('signature', signature)
    axios
      .post(
        `https://uxcandy.com/~shapoval/test-task-backend/edit/${
          task.id
        }?developer=KonstantinTrigub`,
        payload
      )
      .then(() => this.getTaskPage(this.props.match.params.page))
  }

  onTaskTextChange = (e, task) => {
    this.setState(
      {
        data: {
          tasks: [
            ...this.state.data.tasks.map(
              t => (t.id === task.id ? { ...t, text: e.target.value } : t)
            )
          ],
          total: this.state.data.total
        }
      },
      () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const currTask = this.state.data.tasks.find(t => t.id === task.id)

          const { id, text } = currTask
          const paramsString = `text=${encodeURIComponent(text)}&token=beejee`
          const signature = md5(paramsString)
          const payload = new FormData()
          payload.append('text', text)
          payload.append('token', 'beejee')
          payload.append('signature', signature)
          axios
            .post(
              `https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=KonstantinTrigub`,
              payload
            )
            .then(() => this.getTaskPage(this.props.match.params.page))
        }, 1000)
      }
    )
  }

  getTotalPages = () => parseInt((this.state.data.total - 1) / 3, 10) + 1

  getTaskPage = page => {
    const sortField = this.state.sort.field
    const sortDirection = this.state.sort.direction ? 'asc' : 'desc'
    axios
      .get(
        `https://uxcandy.com/~shapoval/test-task-backend/?developer=KonstantinTrigub&page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`
      )
      .then(response =>
        this.setState({
          data: {
            tasks: response.data.message.tasks,
            total: response.data.message.total_task_count
          }
        })
      )
  }

  sortTaskByField = field =>
    this.setState(
      { sort: { field, direction: !this.state.sort.direction } },
      () => this.getTaskPage(this.props.match.params.page)
    )

  handlePaginationChange = (e, { activePage }) => {
    const currentPage = this.props.match.params.page
    if (currentPage !== activePage) {
      this.getTaskPage(activePage)
      this.props.history.push(`/dashboard/${activePage}`)
    }
  }

  render() {
    return (
      <React.Fragment>
        <TaskSortPanel sortFunc={this.sortTaskByField} />

        <TaskList
          tasks={this.state.data.tasks}
          onStatusChange={this.onStatusChange}
          onTaskTextChange={this.onTaskTextChange}
        />

        <DashboardPagination
          activePage={Number(this.props.match.params.page)}
          totalPages={this.getTotalPages()}
          handlePaginationChange={this.handlePaginationChange}
        />

        <AddNewTask />
      </React.Fragment>
    )
  }
}
DashboardPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default DashboardPage
