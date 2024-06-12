import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {placeHolderImage} from '../constants/constants';

type AdditionalField = {
  type?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  linkText?: string;
  image?: string;
};

type OfferSliderProps = {
  headerTitle: string | null;
  backgroundImage?: string | null;
  data?: AdditionalField[];
  backgroundColor?: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width / 2 - 15;
const imageHeight = height * 0.17;
const slideHeight = height * 0.34;

const OnlineOffersHalfSliderButton: React.FC<OfferSliderProps> = ({
  backgroundImage = '',
  data,
  headerTitle,
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
        <View style={[styles.slide, styles.staticSlide, {height: slideHeight}]}>
          <Text style={[styles.title, styles.staticSlideTitle]}>
            {item.title}
          </Text>
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
      <View style={[styles.slide, {height: slideHeight}]}>
        <View style={[styles.imageContainer, {height: imageHeight}]}>
          {item.image ? (
            <Image
              source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
              style={[styles.image, {height: imageHeight}]}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{uri: placeHolderImage}}
              style={[styles.image, {height: imageHeight}]}
              resizeMode="cover"
            />
          )}
        </View>
        {item?.title && <Text style={styles.title}>{item.title}</Text>}
        {item?.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
        {item?.content && <Text style={styles.content}>{item.content}</Text>}
        {item?.linkText && (
          <View style={styles.buttonContainer}>
            <Button
              title={'View Offer'}
              onPress={() => console.log('Check out the collection')}
              color="#5d1115"
            />
          </View>
        )}
      </View>
    );
  };

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
  const showStaticSlide = validData.length > 2;
  const limitedData = showStaticSlide ? validData.slice(0, 2) : validData;

  const enhancedData = showStaticSlide
    ? [...limitedData, {type: 'static', title: 'Discover our online Offers'}]
    : [...validData];

  return (
    <ImageBackground
      source={{uri: `https://media-demo.grtjewels.com/${backgroundImage}`}}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
        {enhancedData && enhancedData.length > 0 ? (
          <FlatList
            data={enhancedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth * 2 + 20}
            decelerationRate="fast"
            contentContainerStyle={{paddingHorizontal: 10}}
          />
        ) : (
          <Text style={styles.noDataText}>No offers available</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 1,
    color: '#5d1115',
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf4ef',
    marginHorizontal: 8,
    borderWidth: 0.2,
    borderRadius: 2,
    marginTop: 20,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#5d1115',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 5,
    fontWeight: '600',
  },
  content: {
    fontSize: 12,
    marginVertical: 8,
    textAlign: 'center',
    color: '#5d1115',
    paddingHorizontal: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 5,
  },
  button: {
    borderRadius: 25,
    height: 30,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  staticSlide: {
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  staticSlideTitle: {
    marginTop: 50,
    marginBottom: 0,
    flex: 1,
    justifyContent: 'center',
    color: '#99772b',
    fontSize: 20,
    paddingHorizontal: 10,
  },
  staticButtonContainer: {
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  staticButton: {
    width: 100,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#99772b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default OnlineOffersHalfSliderButton;
