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
import {AdditionalField} from '../../screens/HomeScreen/HomeScreenModal';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {placeHolderImage} from '../../constants/constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Metrics';
import FastImage from 'react-native-fast-image';

type FullSliderProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
  backgroundImage: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width / 2 - horizontalScale(10);
const itemHeight = height * 0.36;

const FullSlider: React.FC<FullSliderProps> = ({
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
    <View style={[styles.slide]}>
      <Icon
        name="bag"
        size={moderateScale(20)}
        color="white"
        style={styles.icon}
      />
      {item?.image ? (
        <FastImage
          source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
          style={[styles.image, {height: itemHeight * 0.85}]}
        />
      ) : (
        <FastImage
          source={{uri: placeHolderImage}}
          style={[styles.image, {height: itemHeight * 0.85}]}
          resizeMode={FastImage.resizeMode.contain}
        />
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
            decelerationRate="fast"
            snapToOffsets={validData.map((_, index) => itemWidth * index)}
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
    padding: horizontalScale(10),
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
    marginVertical: verticalScale(20),
    color: '#5d1115',
    paddingHorizontal: horizontalScale(20),
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    alignItems: 'center',
    marginHorizontal: horizontalScale(8),
    borderRadius: moderateScale(6),
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: verticalScale(15),
    right: horizontalScale(15),
    zIndex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: moderateScale(6),
  },
  noDataText: {
    fontSize: moderateScale(18),
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
});

export default FullSlider;
