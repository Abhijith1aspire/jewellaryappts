import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Search from '../../components/Search';

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
  ProductDetailsScreen: {
    id: string;
    title: string;
    description: string;
    price: string;
    offer: string;
    originalprice: number;
    keywords: string;
    image: string;
  }[];
};

type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;

const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const route = useRoute<ProductDetailScreenRouteProp>();
  const jewelryItems = route?.params;
  console.log(jewelryItems);
  const [searchText, setSearchText] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-back" size={36} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Product Details</Text>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <Search onSearch={setSearchText} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card data={jewelryItems} searchText={searchText} />
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffdd99',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 24,
    color: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
