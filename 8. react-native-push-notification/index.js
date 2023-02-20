/**
 * @format
 */

import {Alert, AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import NotificationService from './src/service/NotificationService';

messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);

//   NotificationService.displayLocalNotification(
//     remoteMessage.notification.title,
//     remoteMessage.notification.body,
//     remoteMessage.data
//   );
});

AppRegistry.registerComponent(appName, () => App);
