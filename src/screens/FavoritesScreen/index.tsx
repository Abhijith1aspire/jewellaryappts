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
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../props/prop';

type FavItemProps = {
  image: string;
  title: string;
  price: number;
  id: string;
  originalprice: number;
  description: string;
  offer: string;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

type CardDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CardDetails'
>;

const FavItem: React.FC<FavItemProps> = ({
  image,
  title,
  price,
  id,
  offer,
  originalprice,
  description,
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
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const favItems = useSelector(
    (state: {
      favdata: {
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
    }) => state.favdata.items,
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={36} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
      </View>
      {favItems.length === 0 && (
        <Text style={{fontSize: 18, color: '#5d1115'}}>
          Please add some items to your favorites!
        </Text>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {favItems &&
          favItems.map(item => (
            <FavItem
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              id={item.id}
              originalprice={item.originalprice}
              offer={item.offer}
              description={item.description}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 20,
    color: 'black',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  itemContainer: {
    width: '98%',
    height: 80,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#fef7f7',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginBottom: 10,
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
