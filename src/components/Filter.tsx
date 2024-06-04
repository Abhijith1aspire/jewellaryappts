import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Filter: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="tune-variant" size={20} />
      <Text style={styles.text}>Filters</Text>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 105,
    backgroundColor: '#FDF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#900',
    flexDirection: 'row',
    marginRight: 20,
    borderRadius: 5,
  },
  text: {
    color: '#900',
    fontSize: 14,
    textAlign: 'center',
    marginLeft: 5,
  },
});
