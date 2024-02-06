import MyMap from './components/MyMap.js';
import Parameters from './components/Parameters.js'
import HelpView from './components/HelpView.js'
import WikiView from './components/WikiView.js'
import ProducerPage from './components/ProducerPage.js'

import { createStackNavigator } from '@react-navigation/stack';
import {initGlobalVars} from "./global.js"

// import {createDrawerNavigator} from '@react-native/drawer'
// https://reactnavigation.org/docs/hello-react-navigation

import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();

import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

const DEBUG = true;
initGlobalVars();

const Stack = createStackNavigator();
function MapPage({ navigation }) {
	return (
		<Stack.Navigator initialRouteName="ProducerMap" >
			<Stack.Screen name="ProducerMap" component={MyMap} navigation={navigation} options={{headerShown: false}} />
			<Stack.Screen name="Producer" component={ProducerPage} navigation={navigation} />
			<Stack.Screen name="ProducerWiki" component={WikiView} navigation={navigation} />
		</Stack.Navigator>
	);
}
 

export default function App() {
	onNavigationChange = (newState) => {
		// console.log("onNavigationChange(",newState,")");
		if (newState.history.length==1 && newState.index==0) {
			if(DEBUG) console.log("onNavigationChange() : Return to Map");
			// TODO Load new parameters.
		}
	}
	return (
		<NavigationContainer onStateChange={(newState) => onNavigationChange(newState)} >
			<Drawer.Navigator initialRouteName="Map" >
				<Drawer.Screen name="Map" component={MapPage} />
				<Drawer.Screen name="Parameters" component={Parameters} />
				<Drawer.Screen name="Wiki" component={WikiView} />
				<Drawer.Screen name="Help" component={HelpView} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
