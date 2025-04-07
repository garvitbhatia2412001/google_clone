import {NavigationContainer} from '@react-navigation/native';
import React, {useRef} from 'react';
import {Text, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from 'src/navigation/AppNavigation';
import {store} from 'src/redux/store';

// Disable font scaling globally for Text and TextInput components
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;

function App() {
  const navigationRef = useRef(null);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
