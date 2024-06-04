import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const NewArrivalsPin: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="tags" size={18} color="#1c90e8" />
      <Text style={styles.text}>NEW ARRIVALS</Text>
    </View>
  );
};

export default NewArrivalsPin;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 105,
    backgroundColor: '#e9eff5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#f7c7bc',
    flexDirection: 'row',
    marginRight: 20,
    borderRadius: 5,
  },
  text: {
    color: '#1c90e8',
    fontSize: 10,
    textAlign: 'center',
    marginLeft: 5,
  },
});
