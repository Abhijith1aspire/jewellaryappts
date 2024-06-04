import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {data} from '../../data/data';
import LikeIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';

type CarditemProps = {
  image: string;
  price: number;
  originalPrice: number;
  offer: string;
};

const JewelleryItemRow: React.FC<CarditemProps> = ({
  image,
  price,
  originalPrice,
  offer,
}) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log('card pressed')}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="bookmark" size={18} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="star" size={18} color="#900" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
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
        <Text style={styles.originalpriceText}>₹{originalPrice}</Text>
      </View>
      <View style={{paddingBottom: 10}}>
        <Text style={styles.offerText}>{offer} Off</Text>
      </View>
    </TouchableOpacity>
  );
};

const Card = () => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <JewelleryItemRow
          key={index.toString()}
          image={item.image}
          price={item.price}
          originalPrice={item.originalprice}
          offer={item.offer}
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
    paddingHorizontal: 15,
  },
  itemContainer: {
    height: 220,
    width: '48%',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
  },
  iconContainer: {
    height: 24,
    width: 24,
    backgroundColor: '#daeff0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginTop: 15,
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
