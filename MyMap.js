import React from 'react';
import {Text} from 'react-native';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';

import data from './data/producers_22.json';

class MyMap extends React.Component {
	render0() {
		return (
			<View style={styles.container}>
				<Text>Hello, Alberic!</Text>
			</View>
		);
	}
	constructor(props) {
		console.log("new HelloWorld");
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