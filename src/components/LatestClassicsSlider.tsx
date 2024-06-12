import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {placeHolderImage} from '../constants/constants';

type OnlineOffersSliderProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data?: AdditionalField[];
};

const {width, height} = Dimensions.get('window');
const itemWidth = width / 2 - 66;

const LatestClassicsSlider: React.FC<OnlineOffersSliderProps> = ({
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

  const renderItem = ({item}: {item: AdditionalField}) => {
    const imageHeight = height * 0.22;
    return (
      <View style={styles.slide}>
        {item.image ? (
          <Image
            source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
            style={[styles.image, {height: imageHeight}]}
          />
        ) : (
          <Image
            source={{uri: placeHolderImage}}
            style={[styles.image, {height: imageHeight}]}
          />
        )}
        {item.title && <Text style={styles.title}>{item.title}</Text>}
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: '#f2d0a9',
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
    color: '#5d1115',
    paddingHorizontal: 40,
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    overflow: 'hidden',
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    color: '#5d1115',
  },
  noDataText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default LatestClassicsSlider;
