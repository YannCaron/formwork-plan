import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import globalStyles from './styles';

export default function NotFoundScreen() {
  return (
    <View style={styles.row}>
      <Text>This screen doesn't exist.</Text>
      <Link href="/" style={styles.link}>
        <Text>Go to home screen!</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  ...globalStyles,
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
