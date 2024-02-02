import React, {useEffect, useRef, useState} from 'react';
import {Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
// https://www.npmjs.com/package/react-native-picker-select
import RNPickerSelect from 'react-native-picker-select';

import categories from '../assets/data/categories.json';
selectOptions = [];
for (cat of categories) {
	selectOptions.push({label:cat.text, value:cat.val})
}
class CategorySelector extends React.Component {
	constructor(props) {
		console.log("new CategorySelector");
		super(props);
		this.state = {
			category: ""
		};
	}
	categoryChange(value) {
		console.log(value);
		// const [measure, setMeasure] = useState(null);
		// https://reactnative.dev/docs/direct-manipulation?language=javascript
		// this.setState({ category: value})
	}
	render() {
		return (
			<RNPickerSelect
				onValueChange={this.categoryChange.bind(this)}
				items={selectOptions}
			/>
		);
	}
};


class Parameters extends React.Component {
	constructor(props) {
		console.log("new Parameters");
		super(props);
		this.state = {
			category: ''
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>Filters</Text>
				<CategorySelector />
			</View>
		);
	}
};
export default Parameters;


const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	}
  });