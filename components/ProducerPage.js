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
			<Text h1 style={styles.header1Text}>{this.state.producer.name}</Text>
			<Text><Text>{this.state.producer.txt}</Text></Text>
			<Text><Text style={styles.titleText}>Email: </Text><Text>{this.state.producer.email}</Text></Text>
			<Text><Text style={styles.titleText}>Téléphone: </Text><Text>{this.state.producer.tel}</Text></Text>
			{this.state.producer.web!="" && <Text><Text style={styles.titleText}>Site web:</Text><Button onPress={() => this.openWeb(this)} title={this.state.producer.web} /></Text>}
			{this.state.producer.wiki!=null && (<Text><Text style={styles.titleText}>Wiki:</Text><Button onPress={() => this.openWiki(this)} title="Wiki" /></Text>)}
			<Text><Text style={styles.titleText}>Addresse: </Text><Text>{this.state.producer.addr} {this.state.producer.postCode} {this.state.producer.city}</Text></Text>
			<Text><Button onPress={() => this.openGps(this)} title="Ouvrir dans le GPS" /></Text>
		  </ScrollView>
		);
	}
};
const styles = StyleSheet.create({
	header1Text: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	titleText: {
		fontWeight: 'bold',
		display:'inline'
	}
});

export default ProducerPage;