import { StyleSheet, View, StatusBar } from 'react-native';
import Onboarding from './screens/Onboarding';

export default function App() {
  return (
    <View style={styles.container}>
      <Onboarding />
      <StatusBar barStyle='dark-content'backgroundColor='white'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
