import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../constants/constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

type StaticBannerProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
  cssClass?: string | undefined;
  backgroundImage?: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width - horizontalScale(40);
const itemHeight = height * 0.52;

const JewellaryCustomizationStaticbanner: React.FC<StaticBannerProps> = ({
  backgroundColor,
  data,
  headerTitle,
  cssClass,
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
          <Image
            source={{
              uri: `https://media-demo.grtjewels.com/${item.image}`,
            }}
            style={styles.image}
          />
        ) : (
          <Image
            source={{
              uri: placeHolderImage,
            }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <View
          style={
            cssClass === 'jewellery-customisation'
              ? styles.contentContainer
              : styles.contentContainerSaveBig
          }>
          {item.title && <Text style={styles.title}>{item.title}</Text>}
          {item.content && <Text style={styles.content}>{item.content}</Text>}
          {item.linkText && (
            <TouchableOpacity
              style={
                cssClass === 'jewellery-customisation'
                  ? styles.button
                  : styles.SaveBigbutton
              }
              onPress={() => console.log('Know More')}>
              <Text
                style={
                  cssClass === 'jewellery-customisation'
                    ? styles.buttonText
                    : styles.SaveBigbuttonText
                }>
                {item.linkText}
              </Text>
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
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: verticalScale(10),
    color: '#5d1115',
  },
  bannerContainer: {
    paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  slide: {
    height: itemHeight,
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
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
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: horizontalScale(50),
    marginBottom: verticalScale(20),
    height: itemHeight * 0.36,
  },
  contentContainerSaveBig: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: verticalScale(15),
    alignItems: 'center',
    paddingHorizontal: horizontalScale(50),
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: (23 * itemWidth * 0.037) / 14,
    fontWeight: '400',
    color: 'white',
    marginVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    textAlign: 'center',
  },
  content: {
    fontSize: itemWidth * 0.037,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: horizontalScale(20),
    fontWeight: '300',
    marginBottom: verticalScale(10),
  },
  button: {
    backgroundColor: 'white',
    height: itemHeight * 0.07,
    width: itemWidth * 0.28,
    borderRadius: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  SaveBigbutton: {
    backgroundColor: '#decb8c',
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(6),
    width: horizontalScale(200),
  },
  buttonText: {
    fontSize: itemWidth * 0.037,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  SaveBigbuttonText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#7b662f',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: moderateScale(18),
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
});

export default JewellaryCustomizationStaticbanner;
