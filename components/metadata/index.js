import React, { Component } from 'react'

import Loader from '../general/loader'
import Style from '../general/style'
import sheet from './metadata.scss'

export class MetadataPanel extends Component {
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
      <section>
        METADATA ABOUT SELECTED BLOCK GOES HERE
        <Style sheet={sheet} />
      </section>
    )
  }
}

export default MetadataPanel
