import React, { Component } from 'react'
import { MAPBOX_ACCESS_TOKEN } from '../../config/tokens.js'

import Loader from '../general/loader'
import Style from '../general/style'
import sheet from './map.scss'

export class Map extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      center: [-97.73145713579152, 30.26371778137515]
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
        // if this is breaking, make sure to check step X in the readme
        accessToken: MAPBOX_ACCESS_TOKEN
      })

      return (
        <div>
          <Map
            style='mapbox://styles/alexprice/cjazmeo05puoy2sqvx8o999lj'
            containerStyle={{
              height: '100vh',
              width: 'calc(100vw - 32em)'
            }}
            onMove={(e) => console.debug('onMove', e)}
            onClick={(e) => console.debug('onClick', e)}
            center={this.state.center}
          />

          <Style sheet={sheet} />
        </div>
      )
    } else return (
      <Loader />
    )
  }
}

export default Map
