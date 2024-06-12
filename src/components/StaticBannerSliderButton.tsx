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
import {TouchableOpacity} from 'react-native-gesture-handler';
import {placeHolderImage} from '../constants/constants';

type StaticBannerSliderButtonProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[];
};

const {width} = Dimensions.get('window');
const itemWidth = width / 2 - 10;

const StaticBannerSliderButton: React.FC<StaticBannerSliderButtonProps> = ({
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
    return (
      <View style={styles.slide}>
        {item.image ? (
          <Image
            source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
            style={styles.image}
            onError={error => console.log('Image load error:', error)}
          />
        ) : (
          <Image
            source={{uri: placeHolderImage}}
            style={styles.image}
            onError={error => console.log('Image load error:', error)}
          />
        )}
        {item.title && (
          <TouchableOpacity style={styles.titleButton}>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
      {validData && validData.length > 0 ? (
        <FlatList
          data={data}
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
    marginTop: 10,
    padding: 10,
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
    color: '#5d1115',
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 340,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  titleButton: {
    height: 40,
    width: 150,
    backgroundColor: '#5d1115',
    marginVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default StaticBannerSliderButton;
