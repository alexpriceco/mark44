import React, { Component } from 'react'

import Loader from '../components/general/loader'
import Layout from '../components/layout'

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount () {
  }

  render () {
    return (
      <Layout
        // props go here
      />
    )
  }
}

export default Layout
