import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'
import TaskCard from '../../cards/TaskCard'

const TaskList = ({ tasks, onStatusChange, onTaskTextChange }) => (
  <Container style={{ height: '394px' }}>
    {tasks.map(task => (
      <TaskCard
        key={task.id}
        task={task}
        onStatusChange={onStatusChange}
        onTaskTextChange={onTaskTextChange}
      />
    ))}
  </Container>
)
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
      image_path: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onTaskTextChange: PropTypes.func.isRequired
}
export default TaskList
