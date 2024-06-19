import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import {AdditionalField} from '../../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../../constants/constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Metrics';
import FastImage from 'react-native-fast-image';

type OnlineOffersSliderProps = {
  headerTitle: string | null;
  backgroundColor?: string | null;
  data?: AdditionalField[];
  backgroundImage?: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width / 2 - 66;

const LatestClassicsSlider: React.FC<OnlineOffersSliderProps> = ({
  backgroundColor,
  data,
  headerTitle,
  backgroundImage,
}) => {
  const validData = data?.filter(
    item =>
      item.type ||
      item.title ||
      item.subtitle ||
      item.content ||
      item.linkText ||
      item.image,
  );

  const renderItem = ({item}: {item: AdditionalField}) => {
    const imageHeight = height * 0.22;
    return (
      <View style={styles.slide}>
        {item.image ? (
          <FastImage
            source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
            style={[styles.image, {height: imageHeight}]}
          />
        ) : (
          <FastImage
            source={{uri: placeHolderImage}}
            style={[styles.image, {height: imageHeight}]}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        {item.title && <Text style={styles.title}>{item.title}</Text>}
      </View>
    );
  };

  const renderFlatList = () => {
    return (
      <>
        {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
        {validData && validData.length > 0 ? (
          <FlatList
            data={validData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth * 2 + 20}
            decelerationRate="fast"
          />
        ) : (
          <Text style={styles.noDataText}>No offers available</Text>
        )}
      </>
    );
  };

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
    paddingVertical: verticalScale(30),
    paddingHorizontal: horizontalScale(12),
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
  headerText: {
    fontSize: (26 * width * 0.037) / 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: verticalScale(15),
    marginBottom: verticalScale(20),
    color: '#5d1115',
    paddingHorizontal: horizontalScale(40),
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: horizontalScale(6),
    borderRadius: moderateScale(5),
  },
  image: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: verticalScale(10),
    borderRadius: moderateScale(5),
  },
  title: {
    fontSize: width * 0.037,
    fontWeight: '600',
    marginTop: verticalScale(10),
    color: '#5d1115',
  },
  noDataText: {
    fontSize: (18 * width * 0.037) / 14,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
});

export default LatestClassicsSlider;
