import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import Marker from './map/Marker'
import Polyline from './map/Polyline'

class Mapify extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mapsLoaded: false,
            map: null,
            maps: null
        }
    }
    onMapLoaded(map, maps) {
        this.fitBounds(map, maps)

        this.setState({
            ...this.state,
            mapsLoaded: true,
            map: map,
            maps: maps
        })
    }
    fitBounds(map, maps) {
        var bounds = new maps.LatLngBounds()
        for (let marker of this.props.AllMarkers) {
            bounds.extend(
                new maps.LatLng(marker.lat, marker.lng)
            )
        }
        map.fitBounds(bounds)
    }
    afterMapLoadChanges() {
        return (
            <div style={{display: 'none'}}>
            <Polyline
                map={this.state.map}
                maps={this.state.maps}
                markers={this.props.AllMarkers} />
            </div>
        )
    }

    render() {
        const {AllMarkers} = this.props;
        return (
            <GoogleMap
                bootstrapURLKeys={{key: 'PUT GOOGLE MAPS KEY HERE'}}
                style={{height: '100vh', width: '100%'}}
                defaultCenter={this.props.AllMarkers[0]}
                defaultZoom={this.props.zoom}
                onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}>

                {AllMarkers && AllMarkers.map((mark, i) => (
                    <Marker key={i} text={mark.area} lat={mark.lat} lng={mark.lng} />
                ))}

                {/*                <Marker text={'ADDRESS'} lat={38.97330905858943} lng={ -77.10469090410157} />
                <Marker text={'PHONE'} lat={38.9209748864926} lng={-76.9083102888672} />
                <Marker text={'IP'} lat={38.82689001319151} lng={-76.92204319902345} />*/}
                 
                {this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}
            </GoogleMap>
        )
    }
}

// Mapify.defaultProps = {
//     markers: [
//         { lat: 38.97330905858943, lng: -77.10469090410157 },
//         { lat: 38.9209748864926, lng: -76.9083102888672 },
//         { lat: 38.82689001319151, lng: -76.92204319902345 }
//     ],
//     center: [47.367347, 8.5500025],
//     zoom: 4
// }

export default Mapify