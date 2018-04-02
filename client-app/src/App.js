import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopNavigation from './components/navigation/TopNavigation'
import DashboardPage from './components/pages/DashboardPage/DashboardPage'
import NewTaskPage from './components/pages/NewTaskPage'
/* eslint-disable react/prefer-stateless-function */

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <TopNavigation />

        <Route exact path="/" render={() => <Redirect to="/dashboard/1" />} />
        <Route path="/dashboard/:page" exact component={DashboardPage} />
        <Route path="/task/new" exact component={NewTaskPage} />
      </div>
    )
  }
}

export default App
