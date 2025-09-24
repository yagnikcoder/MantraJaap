import { ActivityIndicator, Text, View } from 'react-native';
import HeaderComponent from './src/components/headerComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MantraJaapScreen from './src/screens/mantraJaapScreen/mantraJaapScreen';
import HistoryMantraJaapScreen from './src/screens/historyMantraJaapScreen/historyMantraJaapScreen';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

function AppContent() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" />}
        persistor={persistor}
      >
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="MantraJaapScreen"
                component={MantraJaapScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HistoryMantraJaapScreen"
                component={HistoryMantraJaapScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
export default AppContent;
