import React, { Component } from 'react'

import Loader from '../components/general/loader'
import Style from '../components/general/style'
import sheet from '../components/base.scss'

export class Layout extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <main>
        <header>
          <h1>Mark 44</h1>

          <Style sheet={sheet} />
        </header>
      </main>
    )
  }
}

export default Layout
