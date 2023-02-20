import notifee from '@notifee/react-native';


class NotificationService {
  static displayLocalNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Notification',
    });

    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    await notifee.displayNotification({
      id: '123',
      title: 'title',
      body: body,
      data: data ? data : null,
      android: {
        channelId,
      },
    });

    // Display a notification
  };
}

export default NotificationService;
