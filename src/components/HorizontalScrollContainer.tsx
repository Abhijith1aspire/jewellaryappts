import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {jewellary} from '../../data/data';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {dummyData} from '../../data/data';

type JewellaryItemProps = {
  image: string;
  title: string;
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

type ProductDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;

const JewellaryItem: React.FC<JewellaryItemProps> = ({image, title}) => {
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={{justifyContent: 'center', alignItems: 'center'}}
      onPress={() => {
        console.log('first', title);
        // console.log(dummyData[title]);
        navigation.navigate('ProductDetailsScreen', dummyData[title]);
      }}>
      <View style={styles.item}>
        <Image
          source={{uri: image}}
          style={{width: 80, height: 80, resizeMode: 'stretch'}}
        />
      </View>
      <Text style={{fontSize: 14, color: '#900', fontWeight: '600'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const HorizontalScrollContainer: React.FC = () => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}>
      {jewellary.map((item, index) => {
        return (
          <JewellaryItem
            key={index.toString()}
            image={item.image}
            title={item.title}
          />
        );
      })}
    </ScrollView>
  );
};

export default HorizontalScrollContainer;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  item: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#900',
    borderWidth: 0.2,
  },
});
