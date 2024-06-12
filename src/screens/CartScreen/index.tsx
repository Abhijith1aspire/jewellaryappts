import React from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../props/prop';

type CartItemProps = {
  image: string;
  title: string;
  price: number;
  originalprice: number;
  offer: string;
  description: string;
  id: string;
};

type CardDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CardDetails'
>;

const CartItem: React.FC<CartItemProps> = ({
  image,
  title,
  price,
  originalprice,
  offer,
  description,
  id,
}) => {
  const shortTitle = title.split(' ').slice(0, 5).join(' ');
  const navigation = useNavigation<CardDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('CardDetails', {
          image: image,
          price: price,
          originalPrice: originalprice,
          offer: offer,
          title: title,
          description: description,
          id: id,
        });
      }}>
      <Image source={{uri: image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{shortTitle}</Text>
        <Text style={styles.itemText}>Rs {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CardDetailsScreenNavigationProp>();

  const cartItems = useSelector(
    (state: {
      cartdata: {
        items: {
          id: string;
          title: string;
          price: number;
          image: string;
          originalprice: number;
          offer: string;
          description: string;
        }[];
      };
    }) => state.cartdata.items,
  );

  const totalAmount = cartItems.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={36} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>
          Your Cart is empty. Please add some items to your Cart!
        </Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemsContainer}>
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                originalprice={item.originalprice}
                offer={item.offer}
                description={item.description}
                id={item.id}
              />
            ))}
          </View>
        </ScrollView>
      )}
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Cart total: Rs {totalAmount}</Text>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 20,
    color: 'black',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#5d1115',
    textAlign: 'center',
    marginTop: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 60,
  },
  itemsContainer: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#FDF2F2',
    marginBottom: 10,
  },
  itemDetails: {
    marginLeft: 10,
  },
  itemText: {
    fontSize: 14,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5d1115',
  },
  totalText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
