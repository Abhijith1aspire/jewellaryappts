import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {AdditionalField} from '../../data/data';
import {placeHolderImage} from '../../constants/constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/Metrics';
import FastImage from 'react-native-fast-image';

type HalfStaticProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
  backgroundImage: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width - horizontalScale(60);
const slideHeight = height * 0.52;

const GiftsHalfStaticButton: React.FC<HalfStaticProps> = ({
  data,
  headerTitle,
  backgroundColor,
  backgroundImage,
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
          <FastImage
            source={{
              uri: `https://media-demo.grtjewels.com/${item.image}`,
            }}
            style={styles.image}
          />
        ) : (
          <FastImage
            source={{
              uri: placeHolderImage,
            }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
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
      <Icon name="arrowright" size={moderateScale(22)} color="#5d1115" />
    </TouchableOpacity>
  );

  const renderFlatList = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      {backgroundImage && backgroundImage.trim().length > 0 ? (
        <ImageBackground
          source={{uri: `https://media-demo.grtjewels.com/${backgroundImage}`}}
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
    backgroundColor: '#e3bc8c',
    paddingVertical: verticalScale(30),
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
    fontSize: moderateScale(24),
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: verticalScale(10),
    color: '#5d1115',
    paddingHorizontal: horizontalScale(50),
    marginBottom: verticalScale(20),
  },
  slide: {
    width: itemWidth,
    height: slideHeight,
    backgroundColor: '#fbecdf',
    marginHorizontal: horizontalScale(7),
    borderRadius: moderateScale(8),
    padding: horizontalScale(7),
  },
  imageContainer: {
    width: '100%',
    height: '52%',
    overflow: 'hidden',
    borderRadius: moderateScale(8),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    width: '70%',
    padding: horizontalScale(10),
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: (22 * itemWidth * 0.037) / 14,
    fontWeight: '600',
    color: '#5d1115',
    textAlign: 'left',
    flex: 1,
  },
  content: {
    fontSize: itemWidth * 0.037,
    color: '#5d1115',
    fontWeight: '500',
    marginTop: verticalScale(10),
    flex: 1,
  },
  button: {
    backgroundColor: '#f59090',
    borderRadius: moderateScale(4),
    marginVertical: verticalScale(20),
    width: itemWidth / 3,
    height: slideHeight / 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: (15 * itemWidth * 0.037) / 14,
    fontWeight: '600',
    color: '#5d1115',
    marginHorizontal: horizontalScale(10),
  },
  flatListContainer: {
    paddingHorizontal: horizontalScale(10),
  },
  noDataText: {
    fontSize: moderateScale(18),
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
});

export default GiftsHalfStaticButton;
