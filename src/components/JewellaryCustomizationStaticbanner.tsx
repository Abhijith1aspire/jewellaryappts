import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../constants/constants';

type StaticBannerProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
  cssClass?: string | undefined;
};
const {width, height} = Dimensions.get('window');
const itemWidth = width - 40;
const itemHeight = height * 0.55;

const JewellaryCustomizationStaticbanner: React.FC<StaticBannerProps> = ({
  backgroundColor,
  data,
  headerTitle,
  cssClass,
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
            style={[styles.image, {height: itemHeight}]}
          />
        ) : (
          <Image
            source={{
              uri: placeHolderImage,
            }}
            style={[styles.image, {height: itemHeight}]}
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

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.headerText}>{headerTitle}</Text>
      {validData && validData.length > 0 ? (
        <FlatList
          data={validData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.bannerContainer}
          initialScrollIndex={0}
          getItemLayout={(data, index) => ({
            length: itemWidth + 20,
            offset: (itemWidth + 20) * index,
            index,
          })}
        />
      ) : (
        <Text style={styles.noDataText}>No offers available</Text>
      )}
    </View>
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
    marginVertical: 10,
    color: '#5d1115',
  },
  bannerContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.2,
    marginHorizontal: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: itemHeight,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  contentContainerSaveBig: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    alignItems: 'center',
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: '400',
    color: 'white',
    marginBottom: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
    fontWeight: '300',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
  },
  SaveBigbutton: {
    backgroundColor: '#decb8c',
    paddingVertical: 6,
    borderRadius: 6,
    width: 200,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  SaveBigbuttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7b662f',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default JewellaryCustomizationStaticbanner;
