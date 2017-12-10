import React, { Component } from 'react'
import { MAPBOX_ACCESS_TOKEN } from '../../config/tokens.js'

import Loader from '../general/loader'
import Style from '../general/style'
import sheet from './map.scss'

export class Map extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      zoom: [11],
      loading: true,
      center: [-97.731457, 30.263717],
      SelectedGeoID: '',
      HoveredGeoID: '',
      loadedMap: false,
      addedSource: false,
      loadedSource: false
    }

    this.ReactMapboxGl = null
    if (process.browser) {
      const ReactMapboxGlLibrary = require('react-mapbox-gl')
      this.ReactMapboxGl = ReactMapboxGlLibrary.default
      this.Source = ReactMapboxGlLibrary.Source
      this.GeoJSONLayer = ReactMapboxGlLibrary.GeoJSONLayer

      this.Map = this.ReactMapboxGl({ accessToken: MAPBOX_ACCESS_TOKEN })
    }

    this.drawLines = this.drawLines.bind(this)
  }

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

    // onStyleLoad={(map) => {
    //
    // }}

  render () {
    const { Map, GeoJSONLayer, Source } = this
    if (Map && GeoJSONLayer && Source) {
      return (
        <div
          className='map-container'
          onMouseMove={this.drawLines}
        >
          <Map
            center={this.state.center}
            zoom={this.state.zoom}
            style='mapbox://styles/alexprice/cjazmeo05puoy2sqvx8o999lj'
            containerStyle={{
              height: '100vh',
              width: 'calc(100vw - 32em)',
              cursor: 'none'
            }}
            onStyleLoad={(map) => {
              this.setState({ loadedMap: true })
            }}
          >

            { this.state.loadedMap ? <GeoJSONLayer
              data={`https://api.mapbox.com/v4/alexprice.6lh130s9/tilequery/${this.state.center[0]},${this.state.center[1]}.json?radius=${this.state.zoom}&access_token=${MAPBOX_ACCESS_TOKEN}`}
              geoJSONSourceOptions={{
                type: 'vector',
                url: 'mapbox://alexprice.6lh130s9'
              }}
              fillLayout={{ visibility: 'visible' }}
              fillPaint={{
                'fill-color': 'black',
                'fill-opacity': 0.5
              }}
              filter={['all', ['==', 'GEOID', this.state.SelectedGeoID]]}
              fillOnMouseEnter={(e) => {
                console.info(e)
                this.setState({
                  SelectedGeoID: e.features[0].properties.GEOID
                })
              }}
              fillOnClick={(e) => {
                const SelectedGeoID = e.features[0].properties.GEOID
                console.info('SelectedGeoID', SelectedGeoID)
                this.setState({ SelectedGeoID })
                this.props.selectFeatureMetadata({
                  ...e.features[0].properties
                })
              }}
            /> : null}
          </Map>

          <div className='vertLine' ref={(r) => { this.vertLine = r }} />
          <div className='horizLine' ref={(r) => { this.horizLine = r }} />

          <Style sheet={sheet} />
        </div>
      )
    } else return <Loader key={new Date().toISOString()} />
  }
}

export default Map
