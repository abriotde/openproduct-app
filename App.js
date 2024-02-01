import MyMap from './MyMap.js';
import Parameters from './Parameters.js'
import HelpView from './HelpView.js'
import WikiView from './WikiView.js'

// import {createDrawerNavigator} from '@react-native/drawer'
// https://reactnavigation.org/docs/hello-react-navigation

import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();

import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();


export default function App() {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Map">
				<Drawer.Screen name="Map" component={MyMap} />
				<Drawer.Screen name="Parameters" component={Parameters} />
				<Drawer.Screen name="Wiki" component={WikiView} />
				<Drawer.Screen name="Help" component={HelpView} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
