import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

const Banner = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/grtbanner.png')}
        style={styles.image}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    height: height * 0.2,
    width: width * 0.95,
    marginVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '99%',
    height: '99%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
});
