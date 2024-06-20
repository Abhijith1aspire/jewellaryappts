import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CarouselIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {addToFav} from '../screens/FavoritesScreen/action';
import {isItemInCart} from '../utils/utils';
import RootStackParamList from '../props/prop';
import {
  fontScale,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/Metrics';
import {ProductListResponse} from '../screens/ProductListingPage/PLPModel';

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
        <Image source={{uri: image}} style={styles.image} />
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
                dispatch(
                  addToFav({
                    items: [
                      {
                        id: id,
                        title: title,
                        price: price,
                        image: image,
                        originalprice: originalprice,
                        offer: offer,
                        description: description,
                      },
                    ],
                  }),
                );
              }
            }}>
            <Icon name="hearto" size={18} color="#5d1115" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.priceContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.priceText}>₹{price}</Text>
          <Text style={styles.originalpriceText}>₹{originalprice}</Text>
        </View>
        <CarouselIcon
          name="view-carousel-outline"
          size={28}
          color="#7b2e33"
          style={{marginLeft: horizontalScale(8)}}
        />
      </View>
      <View style={{paddingBottom: 1}}>
        <Text style={styles.offerText}>{offer}% Off</Text>
      </View>
    </TouchableOpacity>
  );
};

const Card: React.FC<CardProps> = ({data, type}) => {
  const columnWidth = type === 1 ? '100%' : '48%';
  return (
    <View style={styles.container}>
      {data?.items.length > 0 &&
        data?.items?.map(item => (
          <View
            key={item.id}
            style={[
              styles.itemWrapper,
              {
                width: columnWidth,
              },
            ]}>
            <JewelleryItemRow
              image={item?.thumb_image}
              price={Math.round(item?.price)}
              originalprice={Math.round(item?.price)}
              offer={item?.discount_percent}
              title={item?.name}
              description="test description"
              id={item?.id}
            />
          </View>
        ))}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(20),
    alignItems: 'center',
  },
  itemWrapper: {
    borderRadius: moderateScale(8),
    elevation: moderateScale(2),
    marginBottom: verticalScale(14),
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    height: height * 0.29,
    backgroundColor: '#ffffff',
    borderRadius: moderateScale(8),
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: height * 0.2,
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
    left: 0,
    top: 5,
  },
  rightIcon: {
    right: 0,
    top: 5,
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
  },
});
