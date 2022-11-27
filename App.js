import { StyleSheet, View } from 'react-native';
import WeatherApp from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <WeatherApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
