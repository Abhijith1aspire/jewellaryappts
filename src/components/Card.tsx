import React, {useEffect, useState} from 'react';
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
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

type CarditemProps = {
  image: string;
  price: number;
  originalprice: number;
  offer: string;
  title: string;
  description: string;
  id: string;
  keywords: string;
};

type CardDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CardDetails'
>;

type CardProps = {
  searchText?: string;
  data: CarditemProps[];
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="staro" size={18} color="#5d1115" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            if (isItemInCart(id, favItems)) {
              console.log('Selected Item is already present in you favorites');
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
      <View
        style={{
          height: height * 0.16,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View style={styles.divider} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.priceText}>₹{price}</Text>
          <Text style={styles.originalpriceText}>₹{originalprice}</Text>
        </View>
        <CarouselIcon name="view-carousel-outline" size={28} color="#7b2e33" />
      </View>
      <View style={{paddingBottom: 1}}>
        <Text style={styles.offerText}>{offer} Off</Text>
      </View>
    </TouchableOpacity>
  );
};

const Card: React.FC<CardProps> = ({searchText = '', data}) => {
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (searchText === '') {
      setFilteredData(data);
    } else {
      const newData = data.filter(item =>
        item.keywords.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredData(newData);
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      {filteredData?.map((item, index) => (
        <JewelleryItemRow
          key={item.id}
          image={item.image}
          price={item.price}
          originalprice={item.originalprice}
          offer={item.offer}
          title={item.title}
          description={item.description}
          id={item.id}
          keywords={item.keywords}
        />
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
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
  },
  itemContainer: {
    height: height * 0.29,
    width: '47%',
    margin: '1.5%',
    backgroundColor: '#ffffff',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(5),
    elevation: moderateScale(2),
  },
  iconContainer: {
    height: verticalScale(24),
    width: horizontalScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  divider: {
    borderBottomColor: '#CED0CE',
    borderBottomWidth: moderateScale(1),
    marginVertical: verticalScale(5),
    width: '100%',
  },
  priceText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#5d1115',
  },
  originalpriceText: {
    fontSize: moderateScale(12),
    marginLeft: horizontalScale(20),
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
