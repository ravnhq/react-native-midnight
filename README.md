<p align="center">
    <img width="200" src="./assets/midnight-logo.png">
</p>

<h1 align="center">React Native Midnight</h1>

<div align="center">

Simple react native package for listening to date changes

[![CI status][github-action-image]][github-action-url] [![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[github-action-image]: https://github.com/ant-design/ant-design/workflows/%E2%9C%85%20test/badge.svg
[github-action-url]: https://github.com/ant-design/ant-design/actions?query=workflow%3A%22%E2%9C%85+test%22
[codecov-image]: https://img.shields.io/codecov/c/github/ant-design/ant-design/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/ant-design/ant-design/branch/master
[npm-image]: http://img.shields.io/npm/v/antd.svg?style=flat-square
[npm-url]: http://npmjs.org/package/antd
[download-url]: https://npmjs.org/package/antd
[download-image]: https://img.shields.io/npm/dm/antd.svg?style=flat-square

</div>

## Installation

```sh
# with npm
npm install --save react-native-midnight

# with yarn
yarn add react-native-midnight
```

## API

### Midnight.addListener

The addListener function connects a function to a day change notification event.

This function then returns the reference to the listener. You can remove the listener by calling the `remove` method on it.

```js
import Midnight from 'react-native-midnight'

const App = () => {
  React.useEffect(() => {
    const listener = Midnight.addListener(() => {
      Alert.alert('The day has changed')
    })
    return () => listener.remove()
  }, [])

  return <Text>App</Text>
}
```

### useOnDayChange

Convenience hook that calls the passed function when the day changes

```js
useOnDayChange((callback: () => void))
```

> Note: Because useOnDayChange doesn't watch for dependency changes, the listener will be removed and re-added every time this hook is called. Creating your own effect inline with `Midnight.addListener` might be preferred if this is an issue.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
