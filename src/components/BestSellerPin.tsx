import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const BestSellerPin: React.FC = () => {
  return (
    <View style={styles.container}>
      <Icon name="star" size={18} color="#5d1115" />
      <Text style={styles.text}>BEST SELLER</Text>
    </View>
  );
};

export default BestSellerPin;

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 95,
    backgroundColor: '#FDF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#5d1115',
    flexDirection: 'row',
    marginRight: 20,
    borderRadius: 5,
  },
  text: {
    color: '#5d1115',
    fontSize: 10,
    textAlign: 'center',
    marginLeft: 5,
  },
});
