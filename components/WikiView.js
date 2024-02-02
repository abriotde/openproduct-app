import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class WikiView extends React.Component {
	constructor(props) {
		console.log("new WebView");
		super(props);
	}
	render() {
		return (<WebView
				style={styles.container}
				source={{ uri: 'https://openproduct.freeboxos.fr/wiki/index.php?title=Accueil' }}
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

