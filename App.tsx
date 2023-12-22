import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {TaskContextProvider} from './app/context/TaskContext';
import {TaskManager} from './app/components/TaskManager';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.fullHeight]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TaskContextProvider>
        <TaskManager />
      </TaskContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullHeight: {
    height: '100%',
  },
});

export default App;
