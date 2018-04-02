import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Pagination } from 'semantic-ui-react'

class DashboardPagination extends React.Component {
  state = {
    boundaryRange: 1,
    siblingRange: 0
  }

  render() {
    const { handlePaginationChange, activePage, totalPages } = this.props
    const { boundaryRange, siblingRange } = this.state

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            <Pagination
              activePage={activePage}
              boundaryRange={boundaryRange}
              onPageChange={handlePaginationChange}
              siblingRange={siblingRange}
              totalPages={totalPages}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

DashboardPagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePaginationChange: PropTypes.func.isRequired
}

export default DashboardPagination
