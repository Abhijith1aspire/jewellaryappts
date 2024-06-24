import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CarouselIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {isItemInCart} from '../utils/utils';
import RootStackParamList from '../props/prop';
import {
  fontScale,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/Metrics';
import {ProductListResponse} from '../screens/ProductListingPage/PLPModel';
import FastImage from 'react-native-fast-image';
import {placeHolderImage} from '../constants/constants';

type CarditemProps = {
  image: string;
  price: number;
  originalprice: number;
  offer: string;
  title: string;
  description: string;
  id: string;
  keywords?: string;
};

type CardDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CardDetails'
>;

type CardProps = {
  searchText?: string;
  data: ProductListResponse;
  type: number;
};

const {width, height} = Dimensions.get('window');

const JewelleryItemRow: React.FC<CarditemProps> = ({
  image,
  price,
  originalprice,
  offer,
  title,
  description,
  id,
}) => {
  const navigation = useNavigation<CardDetailScreenNavigationProp>();
  const dispatch = useDispatch();
  const favItems = useSelector(
    (state: {
      favdata: {
        items: {id: string; title: string; price: number; image: string}[];
      };
    }) => state.favdata.items,
  );

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('CardDetails', {
          image: image,
          price: price,
          originalPrice: originalprice,
          offer: offer,
          title: title,
          description: description,
          id: id,
        })
      }>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <FastImage
            source={{uri: placeHolderImage}}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}

        <View style={styles.overlayIcons}>
          <TouchableOpacity style={[styles.iconContainer, styles.leftIcon]}>
            <Icon name="staro" size={18} color="#5d1115" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconContainer, styles.rightIcon]}
            onPress={() => {
              if (isItemInCart(id, favItems)) {
                console.log(
                  'Selected Item is already present in your favorites',
                );
              } else {
                console.log('Added to Favorites');
              }
            }}>
            <Icon name="hearto" size={18} color="#5d1115" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.priceContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {price && <Text style={styles.priceText}>₹{price}</Text>}
          {originalprice && (
            <Text style={styles.originalpriceText}>₹{originalprice}</Text>
          )}
        </View>
        <CarouselIcon
          name="view-carousel-outline"
          size={28}
          color="#7b2e33"
          style={{marginLeft: horizontalScale(8)}}
        />
      </View>
      {offer && (
        <View style={{paddingBottom: 1}}>
          <Text style={styles.offerText}>{offer}% Off</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const Card: React.FC<CardProps> = ({data, type = 1}) => {
  const columnWidth = type === 1 ? width - horizontalScale(24) : width * 0.45;

  const renderItem = ({item}: {item: any}) => (
    <View
      style={[
        styles.itemWrapper,
        {
          width: columnWidth,
          marginBottom: verticalScale(12),
          marginRight: type === 1 ? 0 : horizontalScale(16), // Adjusted marginRight for two-column layout
        },
      ]}>
      <JewelleryItemRow
        image={item?.plp_thumb_image}
        price={Math.round(item?.plp_price)}
        originalprice={Math.round(item?.plp_price)}
        offer={item?.plp_discount_percent}
        title={item?.plp_name}
        description="test description"
        id={item?.plp_id}
      />
    </View>
  );

  return (
    <>
      {data?.plp_items && data?.plp_items.length > 0 ? (
        <FlatList
          data={data?.plp_items}
          renderItem={renderItem}
          keyExtractor={item => item.plp_id.toString()}
          key={type === 1 ? 'one-column' : 'two-column'}
          contentContainerStyle={styles.container}
          numColumns={type === 1 ? 1 : 2}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noDataText}>No Data available</Text>
      )}
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
    backgroundColor: '#fdefe9',
    justifyContent: 'center',
  },
  itemWrapper: {
    width: '47%',
    borderRadius: moderateScale(4),
    elevation: moderateScale(2),
    backgroundColor: '#ffffff',
    marginVertical: verticalScale(6),
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(4),
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: height * 0.205,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlayIcons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
  },
  iconContainer: {
    height: verticalScale(24),
    width: horizontalScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    left: horizontalScale(0),
    top: verticalScale(8),
  },
  rightIcon: {
    right: horizontalScale(0),
    top: verticalScale(8),
  },
  divider: {
    borderBottomColor: '#CED0CE',
    borderBottomWidth: moderateScale(1),
    marginVertical: verticalScale(5),
    width: '100%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  priceText: {
    fontSize: fontScale(16, width * 1),
    fontWeight: 'bold',
    color: '#5d1115',
  },
  originalpriceText: {
    fontSize: fontScale(12),
    marginLeft: horizontalScale(10),
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  offerText: {
    fontSize: moderateScale(13),
    marginVertical: verticalScale(1),
    color: '#5d1115',
    marginLeft: horizontalScale(10),
    fontWeight: '500',
  },
  noDataText: {
    fontSize: fontScale(18),
    color: '#5d1115',
    textAlign: 'center',
    marginVertical: verticalScale(30),
  },
});
