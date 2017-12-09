import React, { Component } from 'react'
import { MAPBOX_ACCESS_TOKEN } from '../../config/tokens.js'

import Loader from '../general/loader'
import Style from '../general/style'
import sheet from './map.scss'

export class Map extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true
    }

    this.ReactMapboxGl = null
    if (process.browser) {
      const ReactMapboxGlLibrary = require('react-mapbox-gl')
      this.ReactMapboxGl = ReactMapboxGlLibrary.default
    }
  }

  componentDidMount () {
  }

  render () {
    if (this.ReactMapboxGl) {
      const Map = this.ReactMapboxGl({
        accessToken: MAPBOX_ACCESS_TOKEN
      })

      return (
        <div>
          <Map
          style='mapbox://styles/alexprice/cjazmeo05puoy2sqvx8o999lj'
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }} />

          <Style sheet={sheet} />
        </div>
      )
    } else return (
      <Loader />
    )
  }
}

export default Map
