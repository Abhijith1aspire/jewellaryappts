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
import {StackNavigationProp} from '@react-navigation/stack';

type FavItemProps = {
  image: string;
  title: string;
  price: number;
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

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

const FavItem: React.FC<FavItemProps> = ({image, title, price}) => {
  const shortTitle = title.split(' ').slice(0, 5).join(' ');
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => {}}>
      <Image
        source={{uri: image}}
        style={{width: 50, height: 50, resizeMode: 'contain'}}
      />
      <View style={{marginLeft: 10}}>
        <Text style={styles.itemText}>{shortTitle}</Text>
        <Text style={styles.itemText}>Rs {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FavoritesScreen: React.FC = () => {
  const favItems = useSelector(
    (state: {
      favdata: {
        items: {id: string; title: string; price: number; image: string}[];
      };
    }) => state.favdata.items,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {favItems.map((item, index) => (
          <FavItem
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

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
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
    paddingHorizontal: 50,
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
