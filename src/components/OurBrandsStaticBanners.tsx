import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../constants/constants';

type StaticBannerProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[];
};

const {width, height} = Dimensions.get('window');
const itemWidth = width - 40;
const itemHeight = height * 0.3;

const OurBrandsStaticBannersButton: React.FC<StaticBannerProps> = ({
  backgroundColor,
  data,
  headerTitle,
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
            source={{uri: placeHolderImage}}
            style={[styles.image, {height: itemHeight}]}
            resizeMode="contain"
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

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
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
    fontWeight: '400',
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
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
  contents: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    left: 200,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '200',
    color: 'white',
    marginBottom: 20,
  },
  content: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 34,
    fontWeight: '300',
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 25,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default OurBrandsStaticBannersButton;
