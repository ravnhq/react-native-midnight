import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  NativeModules,
  Alert,
} from 'react-native'
import { useOnDayChange } from 'react-native-midnight'

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
  useOnDayChange(() => {
    Alert.alert('The day has changed')
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>react-native-midnight 🌓</Text>
      <Button
        onPress={() => {
          NativeModules.Midnight.triggerDayChangedEvent() // eslint-disable-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        }}
        title="Trigger"
      />
    </View>
  )
}
