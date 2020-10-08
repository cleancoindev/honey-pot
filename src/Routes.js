import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './screens/Home'
import Profile from './screens/Profile'
import ProposalDetail from './screens/ProposalDetail'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/proposal/:id" component={ProposalDetail} />
      <Route exact path="/vote/:id" component={ProposalDetail} />
      <Route path="/" component={Home} />
    </Switch>
  )
}
