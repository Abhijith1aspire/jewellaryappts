import React, {useState} from 'react';
import {View, Image, StyleSheet, Dimensions, FlatList} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';

type SliderProps = {
  backgroundColor: string | null;
  data: AdditionalField[];
};

const {width} = Dimensions.get('window');

const BannerSlider: React.FC<SliderProps> = ({backgroundColor, data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({item}: {item: AdditionalField}) => (
    <View style={styles.slide}>
      <Image
        source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
        style={styles.image}
      />
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <FlatList
        data={data}
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
        {data?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.currentIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
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
});

export default BannerSlider;
