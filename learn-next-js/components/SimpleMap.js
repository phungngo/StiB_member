import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 10.7626314,
            lng: 106.696062
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDYarsdxGwOVSm5XhkzpJZMVSEMe9YRJOI' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <AnyReactComponent
                        lat={10.7626314}
                        lng={106.696062}
                        text={'Stib.co'}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;