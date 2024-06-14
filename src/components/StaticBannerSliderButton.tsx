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
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {placeHolderImage} from '../constants/constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

type StaticBannerSliderButtonProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[];
  backgroundImage: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width / 2 - horizontalScale(10);
const itemHeight = height * 0.42;

const StaticBannerSliderButton: React.FC<StaticBannerSliderButtonProps> = ({
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

  const renderItem = ({item}: {item: AdditionalField}) => (
    <View style={styles.slide}>
      {item.image ? (
        <Image
          source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
          style={styles.image}
        />
      ) : (
        <Image source={{uri: placeHolderImage}} style={styles.image} />
      )}
      {item.title && (
        <TouchableOpacity style={styles.titleButton}>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );

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
            snapToInterval={itemWidth + horizontalScale(20)}
            decelerationRate="fast"
            contentContainerStyle={styles.bannerContainer}
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
    padding: horizontalScale(10),
    paddingVertical: verticalScale(30),
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
    fontSize: (25 * width * 0.037) / 14,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: verticalScale(20),
    color: '#5d1115',
  },
  bannerContainer: {
    paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  slide: {
    height: itemHeight,
    width: itemWidth,
    alignItems: 'center',
    marginHorizontal: horizontalScale(8),
    borderRadius: moderateScale(5),
  },
  image: {
    width: '100%',
    height: '85%',
    resizeMode: 'cover',
    borderRadius: moderateScale(5),
  },
  titleButton: {
    height: itemHeight * 0.12,
    width: itemWidth * 0.75,
    backgroundColor: '#5d1115',
    marginVertical: verticalScale(10),
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: (24 * itemWidth * 0.037) / 14,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: moderateScale(18),
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
});

export default StaticBannerSliderButton;
