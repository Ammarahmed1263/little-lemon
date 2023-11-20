import { StyleSheet, View, StatusBar } from 'react-native';
import Onboarding from './screens/Onboarding';

export default function App() {
  return (
    <View style={styles.container}>
      <Onboarding />
      <StatusBar barStyle='light-content' backgroundColor='#EE9972'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
