import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, { Marker} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import * as FileSystem from 'expo-file-system';
import { Asset } from "expo-asset";
// import AssetUtils from "expo-asset-utils";
// import RNFS from 'react-native-fs';
import AreasList from "../assets/data/departements.json";
var noFilter = function (producer) {return true;}
var filterChar = "a";
var charFilter = function (producer) {
    if(producer && producer.cat!=null) {
        return producer.cat.charAt(0)==filterChar;
    } else {  
        return false;
    }               
}               
var twoCharFilter = function (producer) {
    if(producer && producer.cat!=null && producer.cat.charAt(0)==filterChar.charAt(0)) {
        var subfilter = filterChar.charAt(1); 
        for (var i=1; i<producer.cat.length; i++) {
             if (producer.cat.charAt(1)==subfilter) {
                console.log("twoCharFilter(",producer.cat,") (",filterChar,") => true");
                return true;
             }      
        }       
    }
    console.log("twoCharFilter(",producer.cat,") (",filterChar,") => false");
    return false;
}


const DEBUG = true;

class MyMap extends React.Component {
	constructor(props) {
		// https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
		console.log("new MyMap");
		super(props);
		this.state = {
			region: {
				latitude: 48.435490,
				longitude: -2.20096,
				latitudeDelta: 0.5,
				longitudeDelta: 0.421,
			},
			markers: [],
			loadedAreas: [],
			areasToCheck: [],
			hasAreasToCheck: false,
			producers: {},
			myfilter: noFilter
		};
		this.centerOnMyPosition ();
		if(DEBUG) console.log("new MyMap(",this.state.areasToCheck,")");
	}
	centerMap (elem, latitude, longitude) {
		if(DEBUG) console.log("centerMap (",latitude,",", longitude,")");
		this.state.region.latitude = latitude;
		this.state.region.longitude = longitude;
		this.initProducers(elem);
	}
	initProducers(elem) {
		if(DEBUG) console.log("initProducers()");
		// Remove all previous markers
		for (key in this.state.markers) {
			// console.log("Remove marker")
			// TODO map.removeLayer(this.state.markers[key]);
		}
		areasToCheck = [];
		loadedAreas = [];
		// TODO this.setState(st);
		areaNumber = this.getMainArea();
		if (areaNumber>0) {
			this.getAllProducers(elem, [areaNumber]);
		} else {
			if(DEBUG) console.warn("Fail get main Area");
		}
	}
	async getAllProducers(elem, areas) {
		if(DEBUG) console.log("getAllProducers(",areas,")");
		if (this.state.loadedAreas.length>10) {
			// TODO : Re-Init all
		}
		loadedAreas = this.state.loadedAreas;
		for(area of areas) {
			if (!loadedAreas.includes(area)) {
				loadedAreas.push(area);
				if(DEBUG) console.log("getProducers(",area,")");
				const producersPath = "data/producers_"+area+".json";
				// const producers = require(producersPath);
				/* const producers = RNFS.readFile(producersPath, 'utf8')
				.then((res) => {
					const producers2 = JSON.parse(res); 
					console.log("producers2:",producers2);
				}); */
				// let asset = await AssetUtils.resolveAsync(INDEX_FILE_PATH);
				const producers = await fetch('https://openproduct.freeboxos.fr/'+producersPath)
				.then((response) => {
					console.log("response:",response);
					return response.json();
				})
				.then((json) => this.displayProducers(elem, json.producers))
				.catch(error => {
					console.log("errorFetch:",error);
				});
				// console.log(FileSystem.bundleDirectory);
				// console.log(FileSystem.documentDirectory);
				/* FileSystem.readAsStringAsync(
					producersPath,
					{length:128000}
				)
				.then(data => {
					console.log("data:",data);
				})
				.catch(error => {
					console.log("error:",error);
				}); */
			}
		}
		this.setState({loadedAreas:loadedAreas, areasToCheck:areasToCheck, hasAreasToCheck:true});
		this.checkNeighbouring(elem);
	}
	displayProducers(elem, producers) {
		if(DEBUG) console.log("displayProducers(",producers.length,")");
		var allProducers = this.state.producers;
		var visibleMarkers = [];
		if(DEBUG) console.log("displayProducers(producers=",producers.length,")");
		for (const producer of producers) {
			if (producer!=undefined) { 
				var key = "m"+producer.lat+"_"+producer.lng;
				allProducers[key] = producer;
			}else {
				console.log("Error : displayProducers() : producer==undefined.");
			}
		}
		if(DEBUG) console.log("displayProducers(allProducers=",")");
		for (key in allProducers) {
			var producer = allProducers[key];
			if (this.state.myfilter(producer)) {
				// console.log("display");
				visibleMarkers.push(producer);
			} else {
				// console.log("hide");
			}
		}
		this.setState({
			producers: allProducers,
			markers: visibleMarkers
		});
		elem.setState({
			producers: allProducers,
			markers: visibleMarkers
		});
	}
	getMainArea() {
		if(DEBUG) console.log("getMainArea()");
		const center = {
			lat:this.state.region.latitude,
			lng:this.state.region.longitude
		};
		// Foreach areas  // Find the first where the center is in
		for (const [id, area] of Object.entries(AreasList)) {
			if (this.isInArea(area, center)) {
				if(DEBUG) console.log("getMainArea() => ", id);
				return parseInt(id);
			}
		}
		console.log("Error : fail getMainArea()");
		return 0;
	}
	isInArea(area, point) {
		return area.min[0]<point.lat && area.max[0]>point.lat
				&& area.min[1]<point.lng && area.max[1]>point.lng;
	}
	checkNeighbouring(elem) {
		if(DEBUG) console.log("checkNeighbouring(",elem.state.areasToCheck,")");

		if (this.state.hasAreasToCheck) { // Neighbouring has change only if we have loaded more producers
			this.refreshAreasToCheck();
		}

		// Check strategic points.
		var toLoad = [];
		const region = this.state.region;
		const center = {lat:region.latitude, lng:region.longitude };
		var northWest = {lat:region.latitude+region.latitudeDelta, lng:region.longitude-region.longitudeDelta},
			northEast = {lat:region.latitude+region.latitudeDelta, lng:region.longitude+region.longitudeDelta},
			southWest = {lat:region.latitude-region.latitudeDelta, lng:region.longitude-region.longitudeDelta},
			southEast = {lat:region.latitude-region.latitudeDelta, lng:region.longitude+region.longitudeDelta};
		for (areaId of elem.state.areasToCheck) {
			var area = AreasList[areaId];
			if(this.isInArea(area, center)) { // Should be unnecessary [48.533839, 1.526993]
				// console.log("checkNeighbouring() : center in ",areaId,area);
				toLoad.push(areaId);
			}else if(this.isInArea(area, northWest)) { // There is maybe a better way than test 4 points.  
				// console.log("checkNeighbouring() : northWest in ",areaId,area);
				toLoad.push(areaId);
			}else if(this.isInArea(area, northEast)) {
				// console.log("checkNeighbouring() : northEast in ",areaId,area);
				toLoad.push(areaId);
			}else if(this.isInArea(area, southWest)) {
				// console.log("checkNeighbouring() : southWest in ",areaId,area);
				toLoad.push(areaId);
			}else if(this.isInArea(area, southEast)) {
				// console.log("checkNeighbouring() : southEast in ",areaId,area);
				toLoad.push(areaId);
			}
		}
	
		// Load needed areas
		if (toLoad.length>0) {
			if(DEBUG) console.log("checkNeighbouring() : need to load : ",toLoad, " from ", this.state.areasToCheck,
			"; loadedAreas=",elem.state.loadedAreas)
			this.getAllProducers(elem, toLoad);
		} 
	}
	centerOnMyPosition () {
		GetLocation.getCurrentPosition({
			// enableHighAccuracy: true,
			timeout: 60000,
		})
		.then(location => {
			console.log("Location is : ",location);
			this.centerMap (this, location.latitude, location.longitude)
		})
		.catch(error => {
			const { code, message } = error;
			console.warn(code, message);
			this.centerMap (this, this.state.region.latitude, this.state.region.longitude);
		});
	}
	refreshAreasToCheck() {
		if(DEBUG) console.log("refreshAreasToCheck() for ",this.state.loadedAreas);
		// Avoid duplicates : find unique neigbourhood for all loaded areas.
		var neighbours = [];
		for(const area of this.state.loadedAreas) {
			if (AreasList[area]==undefined) {
				console.log("Error : AreasList[",area,"]==undefined");
			} else if (neighbours.length==0) {
				neighbours = AreasList[area].nbhd;
				// if(DEBUG) console.log("refreshAreasToCheck() for ",area,neighbours);
			} else {
				neighbours2 = AreasList[area].nbhd;
				// if(DEBUG) console.log("refreshAreasToCheck() for2 ",area,neighbours2);
				var i1=0, i2=0, len1=neighbours.length, len2=neighbours2.length;
				var v1 = neighbours[i1];
				var v2 = neighbours2[i2];
				var prev = 0;
				var modeCopy = false;
				var neighbours1 = [];
				// As neighbouring are sorted, we avoid to alocate unnecesary space : i.e. do not copy if nothing to add on neighbours.
				while (i1<len1 && i2<len2) {
					// if(DEBUG) console.log("refreshAreasToCheck() ",v1,v2);
					if (v1==v2) { // Go to next
						if (modeCopy) {
							// if(DEBUG) console.log("refreshAreasToCheck() modeCopy/pushV1 ",v1);
							neighbours1.push(v1);
						}
						i1++; i2++; prev = v1;
						v1 = neighbours[i1];
						v2 = neighbours2[i2];
					} else if((v1>v2)) { // Need to insert v2 in middle => modeCopy
						if (!modeCopy) {
							// if(DEBUG) console.log("refreshAreasToCheck() modeCopy ");
							for(i=0;i<i1;i++) neighbours1.push(neighbours[i]);
							modeCopy = true;
						}
						// if(DEBUG) console.log("refreshAreasToCheck() pushV2 ", v2);
						neighbours1.push(v2);
						i2++;
						v2 = neighbours2[i2];
					} else if((v1>v2)) { // Need to insert v2 in middle => modeCopy
						if (!modeCopy) {
							// if(DEBUG) console.log("refreshAreasToCheck() modeCopy ");
							for(i=0;i<i1;i++) neighbours1.push(neighbours[i]);
							modeCopy = true;
						}
						// if(DEBUG) console.log("refreshAreasToCheck() pushV2 ", v2);
						neighbours1.push(v2);
						i2++;
						v2 = neighbours2[i2];
					} else if((v2>v1)) { // Need to increment i1;
						// if(DEBUG) console.log("refreshAreasToCheck() ++ ",v1);
						if (modeCopy) {
							// if(DEBUG) console.log("refreshAreasToCheck() modeCopy/pushV1/1 ",v1);
							neighbours1.push(v1);
						}
						i1++;
						v1 = neighbours[i1];
					}
				}
				if (modeCopy) {
					neighbours = neighbours1;
				}
				while (i2<len2) {
					// if(DEBUG) console.log("refreshAreasToCheck() fill ",i2,"/",len2," for ",neighbours2);
					neighbours.push(neighbours2[i2++]);
				}
			}
		}
	    if(DEBUG) console.log("Neighbours:",neighbours);
		// Remove neigbours ever loaded.
		var areasToCheck = neighbours.filter(x => !this.state.loadedAreas.includes(x));
		this.setState({areasToCheck:areasToCheck, hasAreasToCheck:false});
		if(DEBUG) console.log("AreasToCheck:",this.state.areasToCheck, "; loadedAreas=",this.state.loadedAreas);
	}
	regionChange(elem, aNewRegion) {
		if(DEBUG) console.log("onRegionChange(",")");
		this.checkNeighbouring(elem);
	}
	render() {
		return (
		  <View style={styles.container}>
			<MapView style={styles.map}
					region={this.state.region}
					onRegionChange={this.regionChange(this)}
					onMapReady={this.checkNeighbouring(this)}>
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

