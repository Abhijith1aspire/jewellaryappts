import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  ImageBackground,
} from 'react-native';
import {AdditionalField} from '../../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../../constants/constants';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/Metrics';
import FastImage from 'react-native-fast-image';

type SliderProps = {
  backgroundColor?: string | null;
  data?: AdditionalField[];
  backgroundImage?: string | null;
};

const {height, width} = Dimensions.get('window');
const imageHeight = height * 0.45;

const CarouselSlider: React.FC<SliderProps> = ({
  backgroundColor,
  data,
  backgroundImage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <FastImage
          source={{uri: `https://media-demo.grtjewels.com/${item?.image}`}}
          style={[styles.image, {height: imageHeight}]}
          resizeMode={FastImage.resizeMode.stretch}
        />
      ) : (
        <FastImage
          source={{uri: placeHolderImage}}
          style={[styles.image, {height: imageHeight}]}
        />
      )}
    </View>
  );

  const renderFlatList = () => (
    <View>
      {validData && validData.length > 0 ? (
        <View>
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
        </View>
      ) : (
        <Text style={styles.noDataText}>No offers available</Text>
      )}
    </View>
  );

  return (
    <>
      {backgroundImage && backgroundImage.trim().length > 0 ? (
        <ImageBackground
          source={{uri: `https://media-demo.grtjewels.com/${backgroundImage}`}}
          style={[styles.container, styles.backgroundImage]}
          resizeMode="cover">
          {renderFlatList()}
        </ImageBackground>
      ) : (
        <View
          style={[
            styles.container,
            styles.backgroundView,
            {
              backgroundColor:
                backgroundColor && backgroundColor.trim().length > 0
                  ? backgroundColor
                  : 'white',
            },
          ]}>
          {renderFlatList()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: verticalScale(20),
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  backgroundView: {
    flex: 1,
    backgroundColor: 'white',
  },
  slide: {
    width: width,
    alignItems: 'center',
    marginTop: verticalScale(20),
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
    top: imageHeight - 10,
    left: 0,
    right: 0,
  },
  indicator: {
    width: verticalScale(6),
    height: horizontalScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: 'pink',
    marginLeft: horizontalScale(5),
  },
  currentIndicator: {
    width: horizontalScale(20),
    height: verticalScale(8),
    borderRadius: moderateScale(4),
    backgroundColor: 'white',
  },
  noDataText: {
    fontSize: (18 * width * 0.037) / 14,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default CarouselSlider;
