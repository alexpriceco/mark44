import React, { Component } from 'react'
import { MAPBOX_ACCESS_TOKEN } from '../../config/tokens.js'
import GeoJSONData from './block-groups.json'

import Loader from '../general/loader'
import Style from '../general/style'
import sheet from './map.scss'

export class Map extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      center: [-97.731457, 30.263717],
      BLOCKCE10Hovered: '',
      BLOCKCE10: '',
      lineWidth: 4
    }

    this.ReactMapboxGl = null
    if (process.browser) {
      const ReactMapboxGlLibrary = require('react-mapbox-gl')
      this.ReactMapboxGl = ReactMapboxGlLibrary.default
      this.GeoJSONLayer = ReactMapboxGlLibrary.GeoJSONLayer

      this.Map = this.ReactMapboxGl({ accessToken: MAPBOX_ACCESS_TOKEN })
    }

    this.drawLines = this.drawLines.bind(this)
  }


  // <Layer
  //   type='fill'
  //   paint={{
  //     'fill-color': '#6F788A',
  //     'fill-opacity': 0.7
  //   }}
  // >
  //   <Feature coordinates={GeoJSONData} />
  // </Layer>

  drawLines (e) {
    let x = e.pageX
    let y = e.pageY
    let vertLine = this.vertLine
    let horizLine = this.horizLine

    if (vertLine && horizLine) {
      let slTrans = 'translate(' + x + 'px, 0px)'
      let hrTrans = 'translate(0px, ' + y + 'px)'
      vertLine.style.transform = slTrans
      horizLine.style.transform = hrTrans
    }
  }

  render () {
    const { Map, GeoJSONLayer } = this

    if (Map && GeoJSONLayer) {
      return (
        <div
          className='map-container'
          onMouseMove={this.drawLines}
        >
          <Map
            center={this.state.center}
            style='mapbox://styles/alexprice/cjazmeo05puoy2sqvx8o999lj'
            containerStyle={{
              height: '100vh',
              width: 'calc(100vw - 32em)',
              cursor: 'none'
            }}
          >
            <GeoJSONLayer
              id='hover-layer'
              data={GeoJSONData}
              fillLayout={{
                visibility: 'visible'
              }}
              fillPaint={{
                'fill-color': 'black',
                'fill-opacity': 0
              }}
              fillOnMouseEnter={(e) => {
                this.setState({
                  BLOCKCE10Hovered: e.features[0].properties.BLOCKCE10
                })
              }}
              fillOnClick={(e) => {
                const BLOCKCE10 = e.features[0].properties.BLOCKCE10
                console.info('BLOCKCE10 1', BLOCKCE10)
                this.setState({ BLOCKCE10, clicked: true }, () => {
                  setTimeout(() => this.setState({ clicked: false }), 200)
                })
                this.props.selectFeatureMetadata({
                  ...e.features[0].properties
                })
              }}
            ></GeoJSONLayer>

            <GeoJSONLayer
              id='base-layer'
              data={GeoJSONData}
              fillLayout={{ visibility: 'visible' }}
              fillPaint={{
                'fill-color': 'black',
                'fill-opacity': 0.05
              }}
              layerOptions={{
                'filter': ["all",
                  ["==", "BLOCKCE10", this.state.BLOCKCE10Hovered]
                ]
              }}
              fillOnClick={(e) => {
                const BLOCKCE10 = e.features[0].properties.BLOCKCE10
                console.info('BLOCKCE10 2', BLOCKCE10)
                this.setState({ BLOCKCE10, clicked: true }, () => {
                  setTimeout(() => this.setState({ clicked: false }), 200)
                })
                this.props.selectFeatureMetadata({
                  ...e.features[0].properties
                })
              }}
            ></GeoJSONLayer>

            <GeoJSONLayer
              id='select-layer'
              data={GeoJSONData}
              fillLayout={{ visibility: 'visible' }}
              fillPaint={{
                'fill-color': 'red',
                'fill-opacity': 0.75
              }}
              layerOptions={{
                'filter': ["all",
                  ["==", "BLOCKCE10", this.state.BLOCKCE10]
                ]
              }}
              fillOnClick={(e) => {
                const BLOCKCE10 = e.features[0].properties.BLOCKCE10
                console.info('BLOCKCE10 3', BLOCKCE10)
                this.setState({ BLOCKCE10, clicked: true }, () => {
                  setTimeout(() => this.setState({ clicked: false }), 200)
                })
                this.props.selectFeatureMetadata({
                  ...e.features[0].properties
                })
              }}
            ></GeoJSONLayer>
          </Map>

          <div
            className={'vertLine' + (this.state.clicked ? ' clicked' : '')}
            ref={(r) => { this.vertLine = r }}
          />
          <div
            className={'horizLine' + (this.state.clicked ? ' clicked' : '')}
            ref={(r) => { this.horizLine = r }}
          />

          <Style sheet={sheet} />
        </div>
      )
    } else return (
      <Loader key={new Date().toISOString()} />
    )
  }
}

export default Map
