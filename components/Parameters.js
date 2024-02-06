import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

// https://www.npmjs.com/package/react-native-picker-select
import RNPickerSelect from 'react-native-picker-select';
import global, {setCategoryFilter} from '../global';

import categories from '../assets/data/categories.json';
selectOptions = [];
selectOptions.push({label:"Aucun filtre.", value:""})
for (cat of categories) {
	selectOptions.push({label:cat.text, value:cat.val})
}
class CategorySelector extends React.Component {
	constructor(props) {
		console.log("new CategorySelector");
		super(props);
		this.state = {
		};
	}
	categoryChange(value) {
		console.log(value," <-/-> ",global.category_filter);
		setCategoryFilter(value);
	}
	render() {
		return (
			<RNPickerSelect
				value={global.category_filter}
				onValueChange={value => this.categoryChange(value)}
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
				<Text>Filtres:</Text>
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