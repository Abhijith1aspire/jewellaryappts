import React from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';

type CartItemProps = {
  image: string;
  title: string;
  price: number;
};
const CartItem: React.FC<CartItemProps> = ({image, title, price}) => {
  const shortTitle = title.split(' ').slice(0, 5).join(' ');
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: image}}
        style={{width: 50, height: 50, resizeMode: 'contain'}}
      />
      <View style={{marginLeft: 10}}>
        <Text style={styles.itemText}>{shortTitle}</Text>
        <Text style={styles.itemText}>Rs {price}</Text>
      </View>
    </View>
  );
};

const CartScreen: React.FC = () => {
  const cartItems = useSelector(
    (state: {
      cartdata: {
        items: {id: string; title: string; price: number; image: string}[];
      };
    }) => state.cartdata.items,
  );

  // console.log(cartItems.reduce((acc,cur)=>));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Items</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cartItems.map((item, index) => (
          <CartItem
            key={index.toString()}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  itemContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FDF2F2',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 40,
  },
  itemText: {
    fontSize: 14,
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});
