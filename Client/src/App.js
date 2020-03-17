import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import UpdateUserInfo from './auth/components/UpdateUserInfo'
import AlertDismissible from './auth/components/AlertDismissible'
import Resume from './resume/components/resume'
import ShowUserInfo from './auth/components/ShowUserInfo'

class App extends Component {
  constructor() {
    super()

    this.state = {
      user: null,
      alerts: [],
      profile: [],
    }
  }

  setUser = user => this.setState({ user })

  setProfile = profile => this.setState({ profile })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render() {
    const { alerts, user, profile } = this.state

    return (
      <React.Fragment>
        <Header user={user} profile={profile} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-info' render={() => (
            <UpdateUserInfo alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/resumes' render={() => (
            <Resume alert={this.alert} user={user} />
          )} />
          <Route path='/profile/:username' render={() => (
            <ShowUserInfo profile={profile} setProfile={this.setProfile} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
