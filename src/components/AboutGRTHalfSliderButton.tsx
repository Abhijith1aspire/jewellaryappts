import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import {AdditionalField} from '../screens/HomeScreen/HomeScreenModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {placeHolderImage} from '../constants/constants';
import {
  fontScale,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/Metrics';

type AboutGRTHaldSliderButtonProps = {
  headerTitle: string | null;
  backgroundColor?: string | null;
  data: AdditionalField[] | undefined;
  backgroundImage?: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width - horizontalScale(60);
const itemHeight = height * 0.4;

const AboutGRTHaldSliderButton: React.FC<AboutGRTHaldSliderButtonProps> = ({
  backgroundColor,
  data,
  headerTitle,
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

  const renderFlatList = () => {
    return (
      <>
        {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
        {validData && validData.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={itemWidth + horizontalScale(20)}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: horizontalScale(10),
              paddingBottom: verticalScale(20),
            }}
          />
        ) : (
          <Text style={styles.noDataText}>No Data available</Text>
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
    fontSize: fontScale(24),
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: verticalScale(10),
    color: '#5d1115',
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    backgroundColor: '#FDF2F2',
    marginHorizontal: horizontalScale(8),
    borderRadius: moderateScale(5),
    elevation: 4,
    alignItems: 'center',
    paddingBottom: verticalScale(10),
  },
  imageContainer: {
    width: '100%',
    height: '48%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: moderateScale(10),
  },
  title: {
    fontSize: fontScale(20, itemWidth),
    fontWeight: '500',
    color: '#5d1115',
  },
  content: {
    fontSize: fontScale(14, itemWidth),
    marginVertical: verticalScale(5),
    color: '#5d1115',
  },
  contentContainer: {
    paddingLeft: horizontalScale(12),
    paddingBottom: verticalScale(10),
    height: '52%',
    width: '100%',
    justifyContent: 'space-between',
  },
  noDataText: {
    fontSize: moderateScale(18),
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
  textContainer: {
    width: '90%',
    alignSelf: 'flex-start',
    marginTop: verticalScale(12),
  },
  buttonContainer: {
    width: itemWidth * 0.36,
    height: itemHeight * 0.09,
    backgroundColor: '#5d1115',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
  },
  button: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default AboutGRTHaldSliderButton;
