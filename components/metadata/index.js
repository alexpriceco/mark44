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
    if (this.props.selectedBlockId) {
      return (
        <section>
          <h1>this.props.selectedBlockId</h1>
          <Style sheet={sheet} />
        </section>
      )
    }

    return (
      <section className='no-selection'>
        <h4>Select a block on the left</h4>
        <Style sheet={sheet} />
      </section>
    )
  }
}

export default MetadataPanel