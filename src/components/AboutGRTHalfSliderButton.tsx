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

type AboutGRTHaldSliderButtonProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
};

const {width} = Dimensions.get('window');
const itemWidth = width - 60;

const AboutGRTHaldSliderButton: React.FC<AboutGRTHaldSliderButtonProps> = ({
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
            source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
            style={styles.image}
          />
        ) : (
          <Image source={{uri: placeHolderImage}} style={styles.image} />
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          {item.title && <Text style={styles.title}>{item.title}</Text>}
          {item.content && <Text style={styles.content}>{item.content}</Text>}
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.button}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
          contentContainerStyle={{paddingHorizontal: 10}}
        />
      ) : (
        <Text style={styles.noDataText}>No Data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F2',
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 10,
    color: '#5d1115',
  },
  slide: {
    width: itemWidth,
    backgroundColor: '#FDF2F2',
    marginHorizontal: 8,
    borderRadius: 5,
    borderWidth: 0.2,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#5d1115',
  },
  content: {
    fontSize: 13,
    marginVertical: 5,
    color: '#5d1115',
  },
  contentContainer: {
    paddingLeft: 12,
    paddingBottom: 10,
  },
  noDataText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: 20,
  },
  textContainer: {
    width: '90%',
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  buttonContainer: {
    width: 100,
    height: 30,
    backgroundColor: '#5d1115',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {textAlign: 'center', color: '#fff'},
});

export default AboutGRTHaldSliderButton;
