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
      this.Layer = ReactMapboxGlLibrary.Layer
      this.Feature = ReactMapboxGlLibrary.Feature

      this.Map = this.ReactMapboxGl({ accessToken: MAPBOX_ACCESS_TOKEN })
    }
  }

  render () {
    const { Map, Layer, Feature } = this
    if (Map && Layer && Feature) {
      return (
        <div>
          <Map
            center={this.state.center}
            style='mapbox://styles/alexprice/cjazmeo05puoy2sqvx8o999lj'
            containerStyle={{
              height: '100vh',
              width: 'calc(100vw - 32em)'
            }}
          >
          <Layer
            type='fill'
            paint={{
              'fill-color': '#6F788A',
              'fill-opacity': 0.7
            }}
          >
            <Feature coordinates={[[
              [-67.13734351262877, 45.137451890638886],
              [-66.96466, 44.8097],
              [-68.03252, 44.3252],
              [-69.06, 43.98],
              [-70.11617, 43.68405],
              [-70.64573401557249, 43.090083319667144],
              [-70.75102474636725, 43.08003225358635],
              [-70.79761105007827, 43.21973948828747],
              [-70.98176001655037, 43.36789581966826],
              [-70.94416541205806, 43.46633942318431],
              [-71.08482, 45.3052400000002],
              [-70.6600225491012, 45.46022288673396],
              [-70.30495378282376, 45.914794623389355],
              [-70.00014034695016, 46.69317088478567],
              [-69.23708614772835, 47.44777598732787],
              [-68.90478084987546, 47.184794623394396],
              [-68.23430497910454, 47.35462921812177],
              [-67.79035274928509, 47.066248887716995],
              [-67.79141211614706, 45.702585354182816],
              [-67.13734351262877, 45.137451890638886]
            ]]} />
          </Layer>
          </Map>

          <Style sheet={sheet} />
        </div>
      )
    } else return (
      <Loader key={new Date().toISOString()} />
    )
  }
}

export default Map
