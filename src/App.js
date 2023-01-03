import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmV5ZW10bSIsImEiOiJCTHUxSVZ3In0.Q-qbg_jG0JcT6bfBeiwXQg";


const cities = [];

const localSearch = (query) => {
  const results = [];
  cities.forEach((r, i) => {
    if (r.n.toLowerCase().includes(query.toLowerCase())) {
      const geojson = {
        type: "Feature",
        id: i,
        text: r.n,
        place_name: `${r.n}`,
        place_type: ["address"],
        center: r.c,
        geometry: {
          type: "Point",
          coordinates: r.c
        },
        properties: r
      };
      results.push(geojson);
    }
  });
  return results;
};

class App extends Component {
  state = {
    viewport: {
      latitude: 0,
      longitude:0,
      zoom: 1
    },
    settings: {
      scrollZoom: {
        smooth: true
      },
      dragPan: {
        inertia: 300 
      },
      touchZoom: {
        intertia: 300
      }
    },

  };

  

  mapRef = React.createRef();

  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 3000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  render() {
    const { viewport, settings } = this.state;
  
    return (
      <div style={{ height: "97vh" }}>
        <MapGL
          ref={this.mapRef}
          {...viewport}
          {...settings}
          width="100%"
          height="100%"
          mapStyle={"mapbox://styles/mapbox/navigation-night-v1"} 
          
          //mapbox://styles/mapbox/outdoors-v12
          //mapbox://styles/mapbox/satellite-streets-v12
          
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            position="top-left"
            localGeocoder={localSearch}
            zoom={12}
          />

        </MapGL>
      </div>
    );
  }
}
export default App;

