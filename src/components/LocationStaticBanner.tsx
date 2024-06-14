import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../constants/constants';
import {horizontalScale, verticalScale} from '../utils/Metrics';

type LocationStaticBannerProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
  backgroundImage?: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width;
const itemHeight = height * 0.7;

const LocationStaticBanners: React.FC<LocationStaticBannerProps> = ({
  backgroundColor,
  data,
  headerTitle,
  backgroundImage,
}) => {
  const flatListRef = useRef<FlatList<AdditionalField>>(null);
  const currentIndex = useRef(0);

  let validData: AdditionalField[] = [];
  if (data) {
    validData = data?.filter(
      item =>
        item.type ||
        item.title ||
        item.subtitle ||
        item.content ||
        item.linkText ||
        item.image,
    );
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (flatListRef.current) {
        currentIndex.current =
          currentIndex.current < validData.length - 1
            ? currentIndex.current + 1
            : 0;
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [validData]);

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
          />
        )}
      </View>
      {item.title && (
        <View style={styles.contents}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    </View>
  );

  const renderFlatList = () => {
    return (
      <>
        <Text style={styles.headerText}>{headerTitle}</Text>
        {validData && validData.length > 0 ? (
          <>
            <FlatList
              ref={flatListRef}
              data={validData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={itemWidth}
              decelerationRate="fast"
              contentContainerStyle={styles.bannerContainer}
            />

            <TouchableOpacity
              style={styles.locateButton}
              onPress={() => console.log('Locate Us')}>
              <Text style={styles.buttonText}>Locate Us</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noDataText}>No Data available</Text>
        )}
      </>
    );
  };
  return (
    <>
      {backgroundImage && backgroundImage.trim().length > 0 ? (
        <ImageBackground
          source={{uri: backgroundImage}}
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
    paddingVertical: verticalScale(20),
    alignItems: 'center',
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
    fontSize: (24 * itemWidth * 0.037) / 14,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: verticalScale(10),
    color: 'black',
    paddingHorizontal: horizontalScale(80),
  },
  bannerContainer: {
    marginTop: verticalScale(10),
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  imageContainer: {
    width: '90%',
    height: itemHeight * 0.7,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  contents: {
    paddingVertical: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  locateButton: {
    height: itemHeight * 0.08,
    width: itemWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'absolute',
    bottom: 30,
    marginBottom: verticalScale(20),
  },
  buttonText: {
    fontSize: itemWidth * 0.037,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: (18 * width * 0.037) / 14,
    color: '#fff',
    textAlign: 'center',
    marginVertical: verticalScale(30),
  },
});

export default LocationStaticBanners;
