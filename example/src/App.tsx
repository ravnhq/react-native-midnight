import * as React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import Midnight from 'react-native-midnight'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function App() {
  const [result, setResult] = React.useState<number | undefined>()

  React.useEffect(() => {
    Midnight.multiply(3, 7)
      .then(setResult)
      .catch(() => undefined)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  )
}
