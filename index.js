/**
 * @format
 */

import {AppRegistry, YellowBox, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
YellowBox.ignoreWarnings(['Warning: ']);
StatusBar.setBackgroundColor('gray');
StatusBar.setBarStyle('dark-content');
AppRegistry.registerComponent(appName, () => App);
