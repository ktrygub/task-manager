import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Image, Grid, Divider } from 'semantic-ui-react'

const TaskCard = ({ task }) => (
  <Segment>
    <Grid divided>
      <Grid.Row style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Grid.Column
          width={2}
          style={{
            paddingLeft: '0px',
            paddingRight: '0px',
            marginRight: '0',
            maxWidth: '160px',
            height: '120px'
          }}
        >
          <Image
            src={task.image_path}
            style={{
              maxWidth: '160px',
              height: '120px',
              width: '100%',
              paddingLeft: 0
            }}
          />
        </Grid.Column>

        <Grid.Column
          width={3}
          style={{
            paddingLeft: '0px',
            paddingRight: '0px',
            marginRight: '0',
            textAlign: 'center',
            maxHeight: '120px',
            overflow: 'auto',
            backgroundColor: '#c3c3c3'
          }}
        >
          <h3 style={{ backgroundColor: '#f1f1f1' }}>User Name</h3>
          <Divider fitted />
          <h3>{task.username}</h3>
        </Grid.Column>

        <Grid.Column
          width={3}
          style={{
            paddingLeft: '0px',
            paddingRight: '0px',
            marginRight: '0',
            textAlign: 'center',
            maxHeight: '120px',
            overflow: 'auto',
            backgroundColor: '#c3c3c3'
          }}
        >
          <h3 style={{ backgroundColor: '#f1f1f1' }}>Email</h3>
          <Divider fitted />
          <h3>{task.email}</h3>
        </Grid.Column>

        <Grid.Column
          width={3}
          style={{
            paddingLeft: '0px',
            paddingRight: '0px',
            marginRight: '0',
            textAlign: 'center',
            maxHeight: '120px',
            overflow: 'auto',
            backgroundColor: task.status === 0 ? '#c3c3c3' : '#56d273'
          }}
        >
          <h3 style={{ backgroundColor: '#f1f1f1' }}>Status</h3>
          <Divider fitted />
          <h3>{task.status === 0 ? 'In progress' : 'Completed'}</h3>
        </Grid.Column>

        <Grid.Column
          width={5}
          style={{
            paddingLeft: '0px',
            paddingRight: '0px',
            marginRight: '0',
            textAlign: 'center',
            maxHeight: '120px',
            overflow: 'auto',
            backgroundColor: '#c3c3c3'
          }}
        >
          <h3 style={{ backgroundColor: '#f1f1f1' }}>Description</h3>
          <Divider fitted />
          <p>{task.text}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    text: PropTypes.string,
    status: PropTypes.number,
    image_path: PropTypes.string
  }).isRequired
}

export default TaskCard
