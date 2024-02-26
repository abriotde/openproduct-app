import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

// https://www.npmjs.com/package/react-native-picker-select
import RNPickerSelect from 'react-native-picker-select';
import global, {setCategoryFilter} from '../global';

import categories from '../assets/data/categories.json';
selectOptions = [];
selectOptions.push({label:"Aucun filtre.", value:""})
for (cat of categories.filters) {
	selectOptions.push({label:cat.text, value:cat.val})
}
class CategorySelector extends React.Component {
	constructor(props) {
		console.log("new CategorySelector");
		super(props);
		if (global.category_filter.length>1) {
			subSelectorVal = true;
			mainSelect = global.category_filter[0];
		} else {
			subSelectorVal = false;
			mainSelect = global.category_filter;
		}
		this.state = {
			mainSelect : mainSelect,
			subSelector : subSelectorVal,
			selectSubOptions : []
		};
		this.checkSubCategorie(global.category_filter);
	}
	checkSubCategorie(value) {
		console.log("checkSubCategorie(",value,")");
		if(value=="") {
			this.setState({subSelector:false});
			return;
		}
		var selectSubOptions = [];
		var mainSelect = value[0];
		for (cat of categories) {
			if (cat.val==mainSelect) {
				for (subcat of cat.subcategories) {
					selectSubOptions.push({label:subcat.text, value:subcat.val});
				}
			}
		}
		if(selectSubOptions.length>0){
			this.setState({
				subSelector: true,
				selectSubOptions: selectSubOptions,
				mainSelect: mainSelect
			});
		}
	}
	categoryChange(value) {
		console.log("categoryChange(",value,") <- ",global.category_filter);
		setCategoryFilter(value);
		this.checkSubCategorie(value);
	}
	subCategoryChange(value) {
		console.log("subCategoryChange(",value,") <- ",global.category_filter);
		setCategoryFilter(value);
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>Filtre par domaine de production</Text>
				<RNPickerSelect
					value={this.state.mainSelect}
					onValueChange={value => this.categoryChange(value)}
					items={selectOptions}
				/>
				{this.state.subSelector &&
					<RNPickerSelect
						value={global.category_filter}
						onValueChange={value => this.subCategoryChange(value)}
						items={this.state.selectSubOptions}
				/>}
			</View>
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
				<Text h2>Filtres:</Text>
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
