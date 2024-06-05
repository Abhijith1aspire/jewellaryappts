import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CardDetails from './src/screens/CardDetails';
import CartScreen from './src/screens/CartScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import MapScreen from './src/screens/MapScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';

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

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

const isUserLoggedIn: boolean = true;

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={screenOptions}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CardDetails" component={CardDetails} />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
        {isUserLoggedIn && (
          <>
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
