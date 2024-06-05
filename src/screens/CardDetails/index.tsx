import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Button from '../../components/Button.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../CartScreen/action.ts';
import {addToFav} from '../FavoritesScreen/action.ts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {isItemInCart} from '../../../utils.ts';

type CardDetailsProps = {
  route: {
    params: {
      image: string;
      price: number;
      originalPrice: number;
      offer: string;
      title: string;
      description: string;
      id: string;
    };
  };
};

type RootStackParamList = {
  HomeScreen: undefined;
  CardDetails: {
    image: string;
    price: number;
    originalPrice: number;
    offer: string;
    title: string;
    description: string;
    id: string;
  };
  CartScreen: undefined;
  FavoritesScreen: undefined;
  MapScreen: undefined;
};

type CartScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CartScreen'
>;

const CardDetails: React.FC<CardDetailsProps> = ({route}) => {
  const {image, price, originalPrice, offer, title, description, id} =
    route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation<CartScreenNavigationProp>();

  const cartItems = useSelector(
    (state: {
      cartdata: {
        items: {id: string; title: string; price: number; image: string}[];
      };
    }) => state.cartdata.items,
  );
  const favItems = useSelector(
    (state: {
      favdata: {
        items: {id: string; title: string; price: number; image: string}[];
      };
    }) => state.favdata.items,
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View style={{backgroundColor: '#FDF2F2'}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.originalPrice}>
          Original Price:{' '}
          <Text style={{textDecorationLine: 'line-through'}}>
            ₹{originalPrice}
          </Text>
        </Text>
        <Text style={styles.offer}>Offer: {offer}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add to Cart"
          onPress={() => {
            if (isItemInCart(id, cartItems)) {
              console.log('Selected Item is already present in cart');
            } else {
              console.log('Added to cart');
              dispatch(
                addToCart({
                  items: [{id: id, title: title, price: price, image: image}],
                }),
              );
            }
          }}
          color="#900"
        />
        <Button
          title="Add to favorites"
          onPress={() => {
            if (isItemInCart(id, favItems)) {
              console.log('Selected Item is already present in you favorites');
            } else {
              console.log('Added to Favorites');
              dispatch(
                addToFav({
                  items: [{id: id, title: title, price: price, image: image}],
                }),
              );
              console.log('Selected Item has been added to your favorites');
            }
          }}
          color="#900"
        />
      </View>
      <View style={{marginTop: 10}}>
        <Button
          title="View Cart"
          onPress={() => {
            console.log('View cart');
            navigation.navigate('CartScreen');
          }}
          color="black"
        />
      </View>
    </View>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  originalPrice: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  offer: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 100,
  },
});
