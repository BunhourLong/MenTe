import { AppRegistry } from 'react-native';
import boot from './boot';
import { name as appName } from './app.json';

const App = boot();

AppRegistry.registerComponent(appName, () => App);
