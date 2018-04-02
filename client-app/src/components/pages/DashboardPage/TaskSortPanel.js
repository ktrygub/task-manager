import React from 'react'
import { Segment, Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const TaskSortPanel = ({ sortFunc }) => (
  <Segment
    style={{
      textAlign: 'center',
      backgroundColor: '#f1f1f1'
    }}
  >
    <Grid divided>
      <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid.Column width={2}>
          <h3>Sort By:</h3>
        </Grid.Column>

        <Grid.Column
          as={Button}
          onClick={() => sortFunc('username')}
          style={{ margin: 0, padding: '.2em 0em' }}
          width={3}
        >
          <h3>User Name</h3>
        </Grid.Column>

        <Grid.Column
          as={Button}
          onClick={() => sortFunc('email')}
          style={{ margin: 0, padding: '.2em 0em' }}
          width={3}
        >
          <h3>Email</h3>
        </Grid.Column>

        <Grid.Column
          as={Button}
          onClick={() => sortFunc('status')}
          style={{ margin: 0, padding: '.2em 0em' }}
          width={3}
        >
          <h3 style={{}}>Status</h3>
        </Grid.Column>

        <Grid.Column width={5} />
      </Grid.Row>
    </Grid>
  </Segment>
)
TaskSortPanel.propTypes = {
  sortFunc: PropTypes.func.isRequired
}

export default TaskSortPanel
