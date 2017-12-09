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
      loading: true
    }
  }

  componentDidMount () {
  }

  render () {
    return (
      <main>
        <Map />
        <MetadataPanel />
        <Style sheet={sheet} />
      </main>
    )
  }
}
