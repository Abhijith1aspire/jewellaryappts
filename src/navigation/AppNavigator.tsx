import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CardDetails from '../screens/CardDetails';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MapScreen from '../screens/MapScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import UserScreen from '../screens/UsersScreen';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';
import {RootStackParamList} from '../props/prop';

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
            <Stack.Screen name="UserScreen" component={UserScreen} />
            <Stack.Screen
              name="ProfileDetailsScreen"
              component={ProfileDetailsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
