import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// const MyWebComponent = () => {
export default function App() {
	return <WebView
		style={styles.container}
		source={{ uri: 'https://openproduct.freeboxos.fr/' }}
	/>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

