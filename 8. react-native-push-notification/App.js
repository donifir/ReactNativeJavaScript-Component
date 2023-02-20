import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import notifee from '@notifee/react-native';

// remote
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const onDisplayLocalNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Sample',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  // remote notif ambil di https://rnfirebase.io/messaging/usage dan https://aboutreact.com/react-native-firebase-cloud-messaging/
  const onDisplayRemoteNotification = async () => {
    console.log('data masuk');
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging()
        .getToken()
        .then(fcmToken => {
          console.log('FCM Token -> ', fcmToken);
        });
    } else {
      console.log('Not Authorization status:', authStatus);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{backgroundColor: 'gold', borderRadius: 5}}
        onPress={() => onDisplayLocalNotification()}>
        <Text style={{paddingHorizontal: 20}}>Display Local Notif</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDisplayRemoteNotification}
        style={{backgroundColor: 'gold', borderRadius: 5, marginTop: 20}}>
        <Text style={{paddingHorizontal: 20}}>Display Remote Notif</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
