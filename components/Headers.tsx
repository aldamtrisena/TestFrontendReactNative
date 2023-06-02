import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface HeadersProps {
  title: String;
}
const Headers: React.FC<HeadersProps> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Headers;
