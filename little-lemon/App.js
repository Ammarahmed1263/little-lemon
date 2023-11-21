import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setisOnboardingCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // await AsyncStorage.clear();
        // console.log('cleared successfully');
        const completed = await AsyncStorage.getItem('completed');
        if (completed !== null) {
          setisOnboardingCompleted(JSON.parse(completed));
        }
        setIsLoading(false);
      } catch(e) {
        console.log('retrieval failed', e);
      }
    })()
  }, [])

  if(isLoading) {
    return (
      <SplashScreen />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnboardingCompleted ? (
          <Stack.Screen name="profile" component={Profile} />
        ) : (
          <Stack.Screen name="onboarding" component={Onboarding} />
          // <Stack.Screen name="splashScreen" component={SplashScreen} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
