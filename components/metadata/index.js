import React, { Component } from 'react'

import Style from '../general/style'
import sheet from './metadata.scss'

export class MetadataPanel extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true
    }
  }

  renderMetadata (features) {
    const featureList = Object.keys(features)
    return featureList.map((f, i) => {
      return (
        <p key={`feature-${i}`}>
          {f}: {features[f]}
        </p>
      )
    })
  }

  render () {
    if (this.props.selectedFeatureMetadata) {
      const features = this.props.selectedFeatureMetadata

      return (
        <section>
          <h4>LOCATION METADATA</h4>
          { this.renderMetadata(features) }
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
