import React, { Component } from 'react'

import Loader from '../components/general/loader'
import Style from '../components/general/style'
import sheet from '../components/base.scss'

import MetadataPanel from './metadata/index'
import Map from './map/index'

export default class Layout extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      selectFeatureMetadata: null
    }
  }

  render () {
    return (
      <main>
        <Map selectFeatureMetadata={(d) => {
          this.setState({ selectedFeatureMetadata: d })
        }} />
        <MetadataPanel
          selectedFeatureMetadata={this.state.selectedFeatureMetadata}
        />
        <Style sheet={sheet} />
      </main>
    )
  }
}
