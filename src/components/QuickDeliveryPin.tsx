import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const QuickDeliveryPin: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="truck" size={18} color="#f77c2a" />
      <Text style={styles.text}>QUICK DELIVERY</Text>
    </View>
  );
};

export default QuickDeliveryPin;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 105,
    backgroundColor: '#fad2bb',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#f7c7bc',
    flexDirection: 'row',
    marginRight: 20,
    borderRadius: 5,
  },
  text: {
    color: '#f77c2a',
    fontSize: 10,
    textAlign: 'center',
    marginLeft: 5,
  },
});
