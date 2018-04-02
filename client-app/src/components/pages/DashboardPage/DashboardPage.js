import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

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
    // loading: false,
  }

  componentWillMount() {
    this.getTaskPage(this.props.match.params.page)
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

        <TaskList tasks={this.state.data.tasks} />

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
