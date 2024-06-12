import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {AdditionalField} from '../data/data';
import {placeHolderImage} from '../constants/constants'; // Ensure you import the placeholder image

type HalfStaticProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
};

const {width} = Dimensions.get('window');
const itemWidth = width - 60;

const GiftsHalfStaticButton: React.FC<HalfStaticProps> = ({
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
      </View>
      <View style={styles.contentContainer}>
        {item.title && <Text style={styles.title}>{item.title}</Text>}
        {item.content && <Text style={styles.content}>{item.content}</Text>}
        {item.linkText && renderButton(item.linkText)}
      </View>
    </View>
  );

  const renderButton = (text: string) => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => console.log('Shop Now')}>
      <Text style={styles.buttonText}>{text}</Text>
      <Icon name="arrowright" size={22} color="#5d1115" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
      {validData && validData.length > 0 ? (
        <FlatList
          data={validData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContainer}
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
    backgroundColor: '#e3bc8c',
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 10,
    color: '#5d1115',
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  slide: {
    width: itemWidth,
    backgroundColor: '#fbecdf',
    marginHorizontal: 7,
    borderRadius: 8,
    padding: 7,
    borderWidth: 0.2,
  },
  imageContainer: {
    width: '100%',
    height: 188,
    overflow: 'hidden',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    width: '70%',
    padding: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    color: '#5d1115',
    textAlign: 'left',
  },
  content: {
    fontSize: 14,
    color: '#5d1115',
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#f59090',
    paddingHorizontal: 4,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 25,
    width: 126,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5d1115',
    marginHorizontal: 10,
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  noDataText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default GiftsHalfStaticButton;
