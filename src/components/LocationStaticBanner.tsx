import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../constants/constants';

type LocationStaticBannerProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
};

const {width} = Dimensions.get('window');
const itemWidth = width;

const LocationStaticBanners: React.FC<LocationStaticBannerProps> = ({
  backgroundColor,
  data,
  headerTitle,
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

  return (
    <View style={[styles.container, {backgroundColor: '#330000'}]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    alignItems: 'center',
    // height: 600,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    marginVertical: 10,
    color: '#FDF2F2',
    paddingHorizontal: 80,
  },
  bannerContainer: {
    marginTop: 10,
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    marginHorizontal: 0,
    backgroundColor: '#330000',
  },
  imageContainer: {
    width: '90%',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  contents: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '200',
    color: '#cc7a00',
    textAlign: 'center',
    marginBottom: 20,
  },
  locateButton: {
    height: 35,
    width: 120,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'absolute',
    bottom: 30,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 30,
  },
});

export default LocationStaticBanners;
