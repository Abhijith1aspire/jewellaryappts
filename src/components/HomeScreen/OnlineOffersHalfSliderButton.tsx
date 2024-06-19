import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {placeHolderImage} from '../../constants/constants';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {AdditionalField} from '../../data/data';
import FastImage from 'react-native-fast-image';

type OfferSliderProps = {
  headerTitle: string | null;
  backgroundImage?: string | null;
  data?: AdditionalField[];
  backgroundColor?: string | null;
};

const {width, height} = Dimensions.get('window');
const containerHeight = height * 0.55;
const slideHeight = containerHeight * 0.65;
const itemWidth = width * 0.46;
const imageHeight = slideHeight * 0.5;
const buttonContainerMarginBottom =
  height > 700 ? verticalScale(20) : verticalScale(5);

const OnlineOffersHalfSliderButton: React.FC<OfferSliderProps> = ({
  backgroundImage,
  data,
  headerTitle,
  backgroundColor,
}) => {
  const Button = ({title, onPress, color}) => (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}: {item: AdditionalField}) => {
    if (item?.type === 'static') {
      return (
        <View
          style={[
            styles.slide,
            styles.staticSlide,
            {height: slideHeight},
            styles.shadowStyle,
          ]}>
          <View style={[styles.staticContentContainer]}>
            <Text style={[styles.title, styles.staticSlideTitle]}>
              {item.title}
            </Text>
          </View>
          <View style={styles.staticButtonContainer}>
            <TouchableOpacity
              style={styles.staticButton}
              onPress={() => console.log('View All')}>
              <Text style={styles.buttonText}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.slide, {height: slideHeight}, styles.shadowStyle]}>
        <View style={[styles.imageContainer, {height: imageHeight}]}>
          {item.image ? (
            <FastImage
              source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <FastImage
              source={{
                uri: placeHolderImage,
              }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
        <View style={{height: slideHeight * 0.5, justifyContent: 'center'}}>
          <View
            style={{
              marginVertical: slideHeight * 0.02,
              height: slideHeight * 0.26,
            }}>
            {item?.title && <Text style={styles.title}>{item.title}</Text>}
            {item?.content && (
              <Text style={styles.content}>{item.content}</Text>
            )}
          </View>
          {item?.linkText && (
            <View
              style={[
                styles.buttonContainer,
                {marginBottom: buttonContainerMarginBottom},
              ]}>
              <Button
                title={'View Offer'}
                onPress={() => console.log('Check out the collection')}
                color="#5d1115"
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  let validData: AdditionalField[] = [];
  if (data) {
    validData = data.filter(
      item =>
        item.type ||
        item.title ||
        item.subtitle ||
        item.content ||
        item.linkText ||
        item.image,
    );
  }
  const showStaticSlide = validData.length > 2;
  const limitedData = showStaticSlide ? validData.slice(0, 2) : validData;

  const enhancedData = showStaticSlide
    ? [...limitedData, {type: 'static', title: 'Discover our online Offers'}]
    : [...validData];

  const renderFlatList = () => {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: headerTitle ? '#ffffff' : '#fdf4ef'},
        ]}>
        {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
        {enhancedData && enhancedData.length > 0 ? (
          <FlatList
            data={enhancedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth + horizontalScale(16)}
            decelerationRate="fast"
            contentContainerStyle={{paddingHorizontal: horizontalScale(8)}}
          />
        ) : (
          <Text style={styles.noDataText}>No offers available</Text>
        )}
      </View>
    );
  };
  return (
    <>
      {backgroundImage && backgroundImage.trim().length > 0 ? (
        <ImageBackground
          source={{uri: `https://media-demo.grtjewels.com/${backgroundImage}`}}
          style={styles.backgroundImage}>
          {renderFlatList()}
        </ImageBackground>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor:
              backgroundColor && backgroundColor.trim().length > 0
                ? backgroundColor
                : 'white',
          }}>
          {renderFlatList()}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: containerHeight * 0.08,
    height: containerHeight,
  },
  headerText: {
    fontSize: (22 * width * 0.037) / 14,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: verticalScale(8),
    color: '#5d1115',
  },
  slide: {
    width: itemWidth,
    alignItems: 'center',
    backgroundColor: '#fdf4ef',
    marginHorizontal: horizontalScale(8),
    borderRadius: 8,
    marginTop: verticalScale(20),
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    height: imageHeight,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: (16 * width * 0.037) / 14,
    fontWeight: '600',
    marginTop: verticalScale(5),
    color: '#5d1115',
    textAlign: 'center',
  },
  content: {
    fontSize: (12 * width * 0.037) / 14,
    marginVertical: slideHeight * 0.02,
    textAlign: 'center',
    color: '#5d1115',
    paddingHorizontal: itemWidth * 0.1,
    fontWeight: '500',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: slideHeight * 0.01,
  },
  button: {
    borderRadius: 25,
    height: slideHeight * 0.11,
    width: itemWidth * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5d1115',
  },
  buttonText: {
    color: 'white',
    fontSize: (12 * width * 0.037) / 14,
  },
  staticSlide: {
    flex: 1,
  },
  staticContentContainer: {
    justifyContent: 'center',
    height: slideHeight * 0.76,
    flex: 1,
  },
  staticSlideTitle: {
    marginTop: verticalScale(20),
    color: '#99772b',
    fontSize: (16 * width * 0.037) / 14,
    paddingHorizontal: horizontalScale(10),
    textAlign: 'center',
  },
  staticButtonContainer: {
    alignItems: 'center',
    paddingTop: slideHeight * 0.02,
    height: slideHeight * 0.2,
  },
  staticButton: {
    height: slideHeight * 0.11,
    width: itemWidth * 0.53,
    borderRadius: 6,
    backgroundColor: '#99772b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  noDataText: {
    fontSize: (16 * width * 0.037) / 14,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
  shadowStyle: {
    elevation: 5,
  },
});

export default OnlineOffersHalfSliderButton;
