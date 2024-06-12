import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {AdditionalField} from '../data/data';
import {placeHolderImage} from '../constants/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

type HalfStaticProps = {
  headerTitle: string | null;
  backgroundColor: string | null;
  data: AdditionalField[] | undefined;
};

const {width, height} = Dimensions.get('window');
const itemWidth = width - 40;

const VirtualShoppingHalfStaticBannerButton: React.FC<HalfStaticProps> = ({
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
          height: 100,
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
          minHeight: 100,
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
                size={14}
                color="green"
                style={{marginRight: 4}}
              />
            )}
            <Text style={styles.subItemButtonText}>{item.linkText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {headerTitle && <Text style={styles.headerText}>{headerTitle}</Text>}
      {validData && validData.length > 0 ? (
        <>
          <View style={styles.itemContainer}>{renderItem(validData[0])}</View>
          <View style={{marginTop: 10}}>{renderSubItems()}</View>
        </>
      ) : (
        <Text style={styles.noDataText}>No offers available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F2',
    paddingVertical: 40,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 10,
    color: '#5d1115',
  },
  itemContainer: {
    width: itemWidth,
    alignItems: 'center',
  },
  slide: {
    width: itemWidth,
    backgroundColor: '#FDF2F2',
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.2,
    marginBottom: 20,
    minHeight: 385,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: '#fff',
  },
  content: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 14,
    width: '60%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    width: 120,
    height: 30,
    borderRadius: 6,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5d1115',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  subItemContainer: {
    width: '48%',
    marginBottom: 20,
  },
  subItem: {
    borderRadius: 8,
    backgroundColor: '#fff',
    maxHeight: 245,
    minHeight: 245,
    width: itemWidth / 2,
  },
  subItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    color: '#fff',
  },
  subItemContent: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  subItemButton: {
    backgroundColor: '#fff',
    borderRadius: 4,
    width: 150,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subItemButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#5d1115',
  },
});

export default VirtualShoppingHalfStaticBannerButton;
