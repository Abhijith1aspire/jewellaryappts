import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../constants/constants';

type SliderProps = {
  backgroundColor: string | null;
  data?: AdditionalField[];
  backgroundImage?: string | null;
};

const {height, width} = Dimensions.get('window');

const CarouselSlider: React.FC<SliderProps> = ({backgroundColor, data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageHeight = height * 0.4;

  const validData = data?.filter(
    item =>
      item?.type ||
      item?.title ||
      item?.subtitle ||
      item?.content ||
      item?.linkText ||
      item?.image,
  );

  const renderItem = ({item}: {item: AdditionalField}) => (
    <View style={[styles.slide, {height: imageHeight}]}>
      {item?.image ? (
        <Image
          source={{uri: `https://media-demo.grtjewels.com/${item?.image}`}}
          style={[styles.image, {height: imageHeight}]}
        />
      ) : (
        <Image
          source={{uri: placeHolderImage}}
          style={[styles.image, {height: imageHeight}]}
        />
      )}
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      {validData && validData.length > 0 ? (
        <>
          <FlatList
            data={validData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={e => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentIndex(Math.round(x / width));
            }}
          />
          <View style={styles.indicatorContainer}>
            {validData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentIndex === index && styles.currentIndicator,
                ]}
              />
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.noDataText}>No offers available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'stretch',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'pink',
    marginLeft: 5,
  },
  currentIndicator: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  noDataText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default CarouselSlider;
