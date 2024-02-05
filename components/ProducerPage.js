import React from 'react';
import {StyleSheet, ScrollView, Text, Button, Linking} from 'react-native';
import {showLocation} from 'react-native-map-link';


const DEBUG = true;

/* 
*/

class ProducerPage extends React.Component {
	constructor(props) {
		// https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
		console.log("new ProducerPage()");
		super(props);
		if (props.route.params!=undefined && props.route.params.producer!=undefined) {
			prod = props.route.params.producer;
			nav = props.route.params.navigation;
		} else {
			prod = {
				lat:0,
				lng:0,
				name:"",
				email:"",
				addr:"",
				postCode:"",
				city:""
			};
			nav = {};
		}
		console.log("new ProducerPage() : producer=", prod);
		this.state = {
			producer:prod,
			navigation:nav
		}
	}
	openGps(elem) {
		console.log("openGps(",elem.state.producer.lat, elem.state.producer.lng,")");
		showLocation({
			latitude: this.state.producer.lat,
			longitude: this.state.producer.lng
		});
	}
	openWiki(elem) {
		console.log("openWiki(",elem.state.producer.wiki,")");
		elem.state.navigation.navigate("Wiki", {title:elem.state.producer.wiki});
	}
	openWeb(elem) {
		console.log("openWeb(",elem.state.producer.web,")");
		if(elem.state.producer.web!="") {
			Linking.openURL(elem.state.producer.web)
		}
	}
	render() {
		return (
		  <ScrollView>
			<Text h1>{this.state.producer.name}</Text>
			<Text>Description: {this.state.producer.txt}</Text>
			<Text>Email: {this.state.producer.email}</Text>
			<Text>Téléphone: {this.state.producer.tel}</Text>
			<Text>Site web:</Text><Button onPress={() => this.openWeb(this)} title={this.state.producer.web} />
			<Text>Wiki:</Text><Button onPress={() => this.openWiki(this)} title="Wiki" />
			<Text>Addresse: {this.state.producer.addr} {this.state.producer.postCode} {this.state.producer.city}</Text>
			<Button onPress={() => this.openGps(this)} title="Ouvrir dans le GPS" />
		  </ScrollView>
		);
	}
};
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	}
  });

export default ProducerPage;