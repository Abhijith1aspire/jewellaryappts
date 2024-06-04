import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

const Banner: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PmoUWwM8-fqjAN3Mxfn8vnKnlo7gP4FoFw&s',
        }}
        style={styles.image}
      />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    height: 150,
    borderRadius: 20,
    alignSelf: 'center', // Center the banner horizontally
    marginVertical: 20, // Add vertical margin to space out the banners
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    borderRadius: 20,
  },
});
