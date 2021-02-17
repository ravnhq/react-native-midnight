import * as React from 'react'

import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeModules,
  NativeEventEmitter,
} from 'react-native'
import Midnight from 'react-native-midnight'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
})

export default function App() {
  const eventEmitter = new NativeEventEmitter(NativeModules.Midnight)

  eventEmitter.addListener('dayChanged', () => {
    console.log('Day changed')
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Midnight 🌓</Text>
      <Button
        onPress={() => {
          Midnight.postNotification()
        }}
        title="Manually Post Notification"
      />
    </View>
  )
}
