import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

import data from './data/producers_22.json';


class MyMap extends React.Component {
	constructor(props) {
		console.log("new MyMap");
		super(props);
		this.state = {
			region: {
				latitude: 48.435490,
				longitude: -2.20096,
				latitudeDelta: 0.5,
				longitudeDelta: 0.421,
			},
			markers: data.producers
		};
		this.centerOnMyPosition ();
	}
	centerOnMyPosition () {
		GetLocation.getCurrentPosition({
			// enableHighAccuracy: true,
			timeout: 60000,
		})
		.then(location => {
			console.log("Location is : ",location);
			this.state.region.latitude = location.latitude;
			this.state.region.longitude = location.longitude;
		})
		.catch(error => {
			const { code, message } = error;
			console.warn(code, message);
		});
	}
	onRegionChange(aNewRegion) {
		console.log(aNewRegion);
	}
	render() {
		return (
		  <View style={styles.container}>
			<MapView style={styles.map}
					region={this.state.region}
					onRegionChange={this.onRegionChange}>
				{this.state.markers.map((marker, index) => (
				<Marker
					key={index}
					coordinate={{latitude: marker.lat, longitude: marker.lng}}
					title={marker.name}
					description={marker.txt}
				/>
				))}
			</MapView>
		  </View>
		);
	}
};

export default MyMap;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	map: {
	  width: '100%',
	  height: '100%',
	},
  });

