import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

import Loader from '../general/loader'
import Style from '../general/style'
import sheet from '../base.scss'

export class Map extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
  }

  const Map = ReactMapboxGl({
    accessToken: MAPBOX_ACCESS_TOKEN
  })

  render () {
    return (
      <div>
        <Map
        style='mapbox://styles/mapbox/streets-v9'
        containerStyle={{
          height: '100vh',
          width: '80vw'
        }}>
          <Layer
            type='symbol'
            id='marker'
            layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
        </Map>
        <Style sheet={sheet} />
      </div>
    )
  }
}

export default Layout
