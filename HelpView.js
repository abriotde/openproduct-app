import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';

class HelpView extends React.Component {
	constructor(props) {
		console.log("new HelpView");
		super(props);
		this.state = {};
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>Bienvenue dans l'aide</Text>
			</View>
		);
	}
};
export default HelpView;


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