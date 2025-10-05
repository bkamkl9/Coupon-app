import { PushNotifications } from '@capacitor/push-notifications'
import { FirebaseMessaging } from '@capacitor-firebase/messaging'

export const registerPush = async () => {
  console.log('🚀 Starting push notification registration...')
  
  // Request permission (for iOS mainly, but good practice)
  const permission = await PushNotifications.requestPermissions()
  console.log('📱 Permission result:', permission)
  
  if (permission.receive !== 'granted') {
    console.error('❌ Push notification permission not granted')
    return
  }

  console.log('✅ Permission granted, registering with FCM...')
  
  // Register with FCM
  await PushNotifications.register()

  // Handle registration success
  PushNotifications.addListener('registration', async (token) => {
    console.log('🎉 Push registration success, token: ', token.value)
    
    // Also get FCM token directly for debugging
    try {
      const fcmToken = await FirebaseMessaging.getToken()
      console.log('🔥 FCM Token:', fcmToken.token)
    } catch (error) {
      console.error('❌ Error getting FCM token:', error)
    }
    
    // Subscribe to the 'all-users' topic for broadcast messages
    try {
      console.log('📡 Subscribing to all-users topic...')
      await FirebaseMessaging.subscribeToTopic({ topic: 'all-users' })
      console.log('✅ Successfully subscribed to all-users topic')
    } catch (error) {
      console.error('❌ Error subscribing to topic:', error)
    }
  })

  // Handle registration error
  PushNotifications.addListener('registrationError', (error) => {
    console.error('❌ Push registration error: ', error)
  })

  // Handle notification received
  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('📨 Push received: ', notification)
  })

  // Handle notification tap
  PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
    console.log('👆 Push action performed: ', action)
  })
}