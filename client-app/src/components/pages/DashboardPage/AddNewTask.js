import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const AddNewTask = () => (
  <Card centered style={{ height: '120px' }}>
    <Card.Content textAlign="center">
      <Card.Header>Add new task</Card.Header>
      <Link to="/task/new">
        <Icon name="plus circle" size="huge" />
      </Link>
    </Card.Content>
  </Card>
)

export default AddNewTask
