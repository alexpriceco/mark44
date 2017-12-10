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
      selectedGeoID: '',
      hoveredGeoID: '',
      loadedMap: false,
      addedSource: false,
      loadedSource: false,
      loadedSourceData: false
    }

    this.ReactMapboxGl = null
    if (process.browser) {
      const ReactMapboxGlLibrary = require('react-mapbox-gl')
      this.ReactMapboxGl = ReactMapboxGlLibrary.default
      this.Layer = ReactMapboxGlLibrary.Layer
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

  // filter={['!=', 'GEOID', this.state.SelectedGeoID]}

    // <GeoJSONLayer
    //   data={{}}
    //   sourceId={'temp-8eryid'}
    //   layerId='temp-8eryid-layer'
    //   geoJSONSourceOptions={{
    //     type: 'vector',
    //     url: 'mapbox://alexprice.6lh130s9'
    //   }}
    //
      // fillLayout={{ visibility: 'visible' }}
      // fillPaint={{
      //   'fill-color': 'red',
      //   'fill-opacity': 0.5
      // }}
    //
    //   onClick={(e) => console.info('clicked')}
    //   fillOnClick={(e) => {
    //     const SelectedGeoID = e.features[0].properties.GEOID
    //     console.info('SelectedGeoID', SelectedGeoID)
    //     this.setState({ SelectedGeoID })
    //     this.props.selectFeatureMetadata({
    //       ...e.features[0].properties
    //     })
    //   }}
    //   fillOnMouseEnter={(e) => {
    //     console.info(e)
    //     this.setState({
    //       SelectedGeoID: e.features[0].properties.GEOID
    //     })
    //   }}
    // />

  render () {
    const { Map, Layer, Source } = this
    if (Map && Layer && Source) {
      return (
        <div
          className='map-container'
          onMouseMove={this.drawLines}
        >
          <div className={
            'loading-container' +
            (this.state.loadedMap ? ' hidden' : '')
          }>
            <Loader />
          </div>

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
              this.setState({ loadedMap: true }, () => {
                map.addLayer({
                  id: 'census-blocks',
                  type: 'fill',
                  source: {
                    type: 'vector',
                    url: 'mapbox://alexprice.6lh130s9'
                  },
                  'source-layer': 'temp-8eryid',
                  'layout': {
                    visibility: 'visible'
                  },
                  'paint': {
                    'fill-opacity': 0
                  },
                  'filter': ['!=', 'GEOID', '']
                })

                map.addLayer({
                  id: 'census-blocks-outline',
                  type: 'line',
                  source: {
                    type: 'vector',
                    url: 'mapbox://alexprice.6lh130s9'
                  },
                  'source-layer': 'temp-8eryid',
                  'layout': {
                    visibility: 'visible'
                  },
                  'paint': {
                    'line-color': 'black',
                    'line-opacity': 0.1,
                    'line-width': 0.5
                  },
                  'filter': ['!=', 'GEOID', '']
                })

                map.on('click', 'census-blocks', (e) => {
                  const { GEOID } = e.features[0].properties
                  this.setState({ selectedGeoID: GEOID })
                  this.props.selectFeatureMetadata({
                    ...e.features[0].properties,
                    selectedGeoID: e.features[0].properties.GEOID
                  })
                })

                map.on('mousemove', 'census-blocks', (e) => {
                  const { GEOID } = e.features[0].properties
                  if (this.state.hoveredGeoID !== GEOID) {
                    this.setState({ hoveredGeoID: GEOID })
                  }
                })
              })
            }}
          >
            {/* this.state.loadedMap
              ? <Source
                sourceId='census-blocks-data'
                geoJSONSourceOptions={{
                  type: 'vector',
                  url: 'mapbox://alexprice.6lh130s9'
                }}
              />
              : null */}

            { this.state.loadedMap ? <Layer
              id='census-blocks-clicked'
              sourceLayer='temp-8eryid'
              sourceId='census-blocks'
              type='fill'
              layout={{}}
              paint={{
                'fill-opacity': 0.5,
                'fill-color': '#1A212D'
              }}
              filter={['==', 'GEOID', this.state.selectedGeoID]}
            />
            : null }

            { this.state.loadedMap ? <Layer
              id='census-blocks-hovered'
              sourceLayer='temp-8eryid'
              sourceId='census-blocks'
              type='fill'
              layout={{}}
              paint={{
                'fill-opacity': 0.1,
                'fill-color': '#75DAD4'
              }}
              filter={['==', 'GEOID', this.state.hoveredGeoID]}
            />
            : null }
          </Map>

          <div className='vertLine' ref={(r) => { this.vertLine = r }} />
          <div className='horizLine' ref={(r) => { this.horizLine = r }} />

          <Style sheet={sheet} />
        </div>
      )
    } else {
      return (
        <div className={
          'loading-container' +
          (this.state.loadedMap ? ' hidden' : '')
        }>
          <Loader />
          <Style sheet={sheet} />
        </div>
      )
    }
  }
}

export default Map
