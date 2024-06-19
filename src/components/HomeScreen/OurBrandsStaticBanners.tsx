import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
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

type StaticBannerProps = {
  headerTitle: string | null;
  backgroundColor?: string | null;
  data: AdditionalField[];
  backgroundImage?: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width - horizontalScale(40);
const itemHeight = height * 0.34;

const OurBrandsStaticBannersButton: React.FC<StaticBannerProps> = ({
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
      <View style={styles.imageContainer}>
        {item.image ? (
          <FastImage
            source={{
              uri: `https://media-demo.grtjewels.com/${item.image}`,
            }}
            style={[styles.image, {height: itemHeight}]}
          />
        ) : (
          <FastImage
            source={{uri: placeHolderImage}}
            style={[styles.image, {height: itemHeight}]}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        <View style={styles.contents}>
          {item.title && <Text style={styles.title}>{item.title}</Text>}
          {item.content && <Text style={styles.content}>{item.content}</Text>}
          {item.linkText && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => console.log('Shop Now')}>
              <Text style={styles.buttonText}>{item.linkText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const renderFlatList = () => {
    return (
      <>
        <Text style={styles.headerText}>{headerTitle}</Text>
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
            initialScrollIndex={0}
            getItemLayout={(data, index) => ({
              length: itemWidth + horizontalScale(20),
              offset: (itemWidth + horizontalScale(20)) * index,
              index,
            })}
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
    fontSize: moderateScale(26),
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: verticalScale(10),
    color: '#5d1115',
  },
  bannerContainer: {
    paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  slide: {
    width: itemWidth,
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    marginHorizontal: horizontalScale(10),
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contents: {
    position: 'absolute',
    top: verticalScale(10),
    bottom: verticalScale(10),
    left: horizontalScale(200),
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(25),
    fontWeight: '200',
    color: 'white',
    marginBottom: verticalScale(20),
  },
  content: {
    fontSize: itemWidth * 0.037,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: horizontalScale(18),
    fontWeight: '300',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: moderateScale(4),
    marginTop: verticalScale(30),
    width: horizontalScale(100),
    height: verticalScale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: itemWidth * 0.037,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: moderateScale(18),
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
});

export default OurBrandsStaticBannersButton;
