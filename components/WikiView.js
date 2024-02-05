import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class WikiView extends React.Component {
	constructor(props) {
		console.log("new WebView(",props.route,")");
		super(props);
		if (props.route!=undefined && props.route.params!=undefined
			&& props.route.params.title!=null) {
			t = props.route.params.title;
		} else {
			t="Accueil";
		}
		this.state = {
			title:t
		}
	}
	render() {

		return (<WebView
				style={styles.container}
				source={{ uri: 'https://openproduct.freeboxos.fr/wiki/index.php?title='+this.state.title}}
			/>);
	}
}
export default WikiView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

