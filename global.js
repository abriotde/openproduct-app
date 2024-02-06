
import AsyncStorage from '@react-native-async-storage/async-storage';

function storePrefs(storeKey, value) {
	try {
		AsyncStorage.setItem(storeKey, value);
		return true;
	} catch (e) {
		console.log("Error : storePrefs(",storeKey,", ",value,") : ", e);
	}
}
async function getPrefs(storeKey, defaultValue) {
	try {
		const value = await AsyncStorage.getItem(storeKey)
		if(value !== null) {
			return value;
		} else {
			return defaultValue;
		}
	} catch(e) {
		console.log("Error : getPrefs(",storeKey,") : ", e);
	}
}

// var global = {};

global.category_filter = "";

export function setCategoryFilter(value) {
	storePrefs('cat', value);
	global.category_filter = value;
}
export function initGlobalVars() {
	try {
		global.category_filter = getPrefs('cat', '');
	} catch(e) {
		console.log("Error : initGlobalVars({cat:",global.category_filter,"}) : ", e);
	}
}


export default global;