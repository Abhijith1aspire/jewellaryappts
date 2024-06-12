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
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {placeHolderImage} from '../constants/constants';

type FullSliderProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
};

const {width} = Dimensions.get('window');
const itemWidth = width / 2 - 1;

const FullSlider: React.FC<FullSliderProps> = ({
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
        <Icon name="bag" size={20} color="white" style={styles.icon} />
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
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
          decelerationRate="fast"
          snapToOffsets={data.map((_, index) => itemWidth * index)}
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
    paddingVertical: 30,
    padding: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 20,
    color: '#5d1115',
    paddingHorizontal: 20,
  },
  slide: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: 6,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 6,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  placeholderText: {
    color: '#666',
  },
  titleContainer: {
    height: 40,
    width: 150,
    backgroundColor: '#5d1115',
    marginVertical: 10,
    borderRadius: 10,
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

export default FullSlider;
