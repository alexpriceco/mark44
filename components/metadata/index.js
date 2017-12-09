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
    if (this.props.selectedFeatureMetadata) {
      const { lat, lon } = this.props.selectedFeatureMetadata
      return (
        <section>
          <h4>LOCATION METADATA</h4>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lon}</p>
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
