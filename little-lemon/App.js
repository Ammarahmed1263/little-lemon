import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from './screens/Boarding';
import Profile from './screens/Profile';
import Home from './screens/Home';
import SplashScreen from './screens/SplashScreen';
import { OnboardingContext } from './src/components/CreateContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setisOnboardingCompleted] = useState(false);
  const [userData, setUserData] = useState({ 
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    image: null,
    notification: {orders: false, password: false, offers: false, newsletter: false},
  });

  useEffect(() => {
    (async () => {
      try {
        const completed = await AsyncStorage.getItem("userInfo");
        if (completed !== null) {
          setUserData({...userData, ...JSON.parse(completed)});
          setisOnboardingCompleted(true);
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
      <OnboardingContext.Provider value={{setisOnboardingCompleted, userData, setUserData}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {isOnboardingCompleted ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Profile" component={Profile} />
              </>
            ) : (
              <Stack.Screen name="Onboarding" component={Onboarding} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </OnboardingContext.Provider>      
  );
}