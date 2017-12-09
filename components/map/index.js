import React, { Component } from 'react'

import Loader from '../general/loader'
import Style from '../general/style'
import sheet from '../base.scss'

export class Map extends Component {
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
      <div>
        MAP GOES HERE
        <Style sheet={sheet} />
      </div>
    )
  }
}

export default Layout
