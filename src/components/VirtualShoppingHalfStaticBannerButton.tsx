import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {AdditionalField} from '../data/data';
import {placeHolderImage} from '../constants/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {moderateScale, verticalScale} from '../utils/Metrics';

type HalfStaticProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
  backgroundImage: string | null;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width - moderateScale(40);

const VirtualShoppingHalfStaticBannerButton: React.FC<HalfStaticProps> = ({
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

  const renderItem = (item: AdditionalField) => (
    <View style={[styles.slide, {backgroundColor: '#73161b'}]}>
      <View style={styles.imageContainer}>
        {item?.image ? (
          <Image
            source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
            style={styles.image}
          />
        ) : (
          <Image source={{uri: placeHolderImage}} style={styles.image} />
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
    </TouchableOpacity>
  );

  const renderSubItems = () => (
    <View style={styles.rowContainer}>
      {validData &&
        validData.slice(1).map((item, index) => (
          <View key={index} style={styles.subItemContainer}>
            {renderSubItem(item, index)}
          </View>
        ))}
    </View>
  );

  const renderSubItem = (item: AdditionalField, index: number) => (
    <View
      style={[
        styles.subItem,
        index === 0
          ? {backgroundColor: '#96b474'}
          : {backgroundColor: '#edc376'},
      ]}>
      <View
        style={{
          width: '100%',
          height: verticalScale(100),
          overflow: 'hidden',
        }}>
        {item?.image ? (
          <Image
            source={{uri: `https://media-demo.grtjewels.com/${item.image}`}}
            style={styles.image}
          />
        ) : (
          <Image source={{uri: placeHolderImage}} style={styles.image} />
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: verticalScale(100),
        }}>
        {item.title && (
          <Text
            style={[
              styles.subItemTitle,
              index === 0 ? {color: '#3f4f27'} : {color: '#987335'},
            ]}>
            {item.title}
          </Text>
        )}
        {item.content && (
          <Text
            style={[
              styles.subItemContent,
              index === 0 ? {color: '#3f4f27'} : {color: '#987335'},
            ]}>
            {item.content}
          </Text>
        )}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {item.linkText && (
          <TouchableOpacity
            style={[styles.subItemButton, {flexDirection: 'row'}]}>
            {index === 0 && (
              <Icon
                name="whatsapp"
                size={moderateScale(14)}
                color="green"
                style={{marginRight: moderateScale(4)}}
              />
            )}
            <Text style={styles.subItemButtonText}>{item.linkText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderFlatList = () => {
    return (
      <>
        {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
        {validData && validData.length > 0 ? (
          <>
            <View style={styles.itemContainer}>{renderItem(validData[0])}</View>
            <View style={{marginTop: moderateScale(10)}}>
              {renderSubItems()}
            </View>
          </>
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

const itemHeight = height * 0.45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F2',
    paddingVertical: verticalScale(40),
    width: '100%',
    alignItems: 'center',
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
    fontSize: (24 * width * 0.037) / 14,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: verticalScale(10),
    color: '#5d1115',
  },
  itemContainer: {
    width: itemWidth,
    alignItems: 'center',
  },
  slide: {
    height: itemHeight,
    width: itemWidth,
    backgroundColor: '#FDF2F2',
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(20),
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: moderateScale(8),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: verticalScale(10),
  },
  title: {
    fontSize: (28 * width * 0.037) / 14,
    fontWeight: '400',
    color: '#fff',
  },
  content: {
    fontSize: width * 0.037,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: verticalScale(14),
    width: '60%',
  },
  button: {
    backgroundColor: '#fff',
    width: itemWidth * 0.3,
    height: itemHeight * 0.08,
    borderRadius: moderateScale(6),
    marginTop: verticalScale(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: (15 * width * 0.037) / 14,
    fontWeight: '600',
    color: '#5d1115',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10),
  },
  subItemContainer: {
    width: '48%',
    marginBottom: verticalScale(20),
  },
  subItem: {
    borderRadius: moderateScale(8),
    backgroundColor: '#fff',
    maxHeight: verticalScale(245),
    minHeight: verticalScale(245),
    width: itemWidth / 2,
  },
  subItemTitle: {
    fontSize: (16 * width * 0.037) / 14,
    fontWeight: '500',
    marginTop: verticalScale(10),
    color: '#fff',
  },
  subItemContent: {
    fontSize: (12 * width * 0.037) / 14,
    color: '#fff',
    fontWeight: '500',
    marginVertical: verticalScale(10),
    textAlign: 'center',
    paddingHorizontal: moderateScale(2),
  },
  subItemButton: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(4),
    width: moderateScale(150),
    height: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  subItemButtonText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#5d1115',
  },
  noDataText: {
    fontSize: moderateScale(18),
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(20),
  },
});

export default VirtualShoppingHalfStaticBannerButton;
