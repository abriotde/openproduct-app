import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
// import LaunchNavigator from 'react-native-launch-navigator'


const DEBUG = true;

/* LaunchNavigator.navigate([50.279306, -5.163158], {
	start: "50.342847, -4.749904"
})
.then(() => console.log("Launched navigator"))
.catch((err) => console.error("Error launching navigator: "+err));
*/

class ProducerPage extends React.Component {
	constructor(props) {
		// https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
		console.log("new ProducerPage(",props,")");
		super(props);
		this.state = {
		}
	}
	render() {
		return (
		  <ScrollView>
			<Text> Hello </Text>
			<Text> World </Text>
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