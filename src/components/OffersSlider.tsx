import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import Button from './Button';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';

type OfferSliderProps = {
  backgroundImage: string | null;
  data: AdditionalField[];
};

const {width} = Dimensions.get('window');
const itemWidth = width / 2 - 15;

const OffersSlider: React.FC<OfferSliderProps> = ({backgroundImage, data}) => {
  const renderItem = ({item}: {item: AdditionalField}) => (
    <View style={styles.slide}>
      <Image
        source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      {item.content && <Text style={styles.content}>{item.content}</Text>}
      {item.linkText && (
        <Button
          title={'View'}
          onPress={() => console.log('Check out the online offer')}
          color="#900"
          minWidth={50}
        />
      )}
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: `https://media-demo.grtjewels.com/${backgroundImage}` || '',
      }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Checkout our online offers</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth * 2 + 20}
          decelerationRate="fast"
          contentContainerStyle={{paddingHorizontal: 10}}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 10,
    color: '#900',
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 10,
    borderWidth: 0.2,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: '#900',
  },
  content: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: 'center',
    color: '#900',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default OffersSlider;
