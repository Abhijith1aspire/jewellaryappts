import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {addToFav} from '../screens/FavoritesScreen/action';
import {isItemInCart} from '../utils/utils';
import RootStackParamList from '../props/prop';

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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="bookmark" size={18} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="star" size={18} color="#900" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
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
          <LikeIcon
            name="hearto"
            size={18}
            style={{marginRight: 10, marginTop: 20}}
            color="#900"
          />
        </TouchableOpacity>
      </View>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.divider} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={styles.priceText}>₹{price}</Text>
        <Text style={styles.originalpriceText}>₹{originalprice}</Text>
      </View>
      <View style={{paddingBottom: 10}}>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemContainer: {
    height: 240,
    width: '47%',
    margin: '1.5%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 0.2,
  },
  iconContainer: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginTop: 15,
    borderWidth: 0.1,
  },
  image: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  divider: {
    borderBottomColor: '#CED0CE',
    borderBottomWidth: 1,
    marginVertical: 5,
    width: '100%',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#900',
    marginLeft: 10,
  },
  originalpriceText: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 20,
    textDecorationLine: 'line-through',
  },
  offerText: {
    fontSize: 13,
    marginVertical: 5,
    color: '#900',
    marginLeft: 10,
  },
});
