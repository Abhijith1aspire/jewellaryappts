import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CardDetails from '../screens/CardDetails';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MapScreen from '../screens/MapScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import UserScreen from '../screens/UsersScreen';
import ProfileDetailsScreen from '../screens/ProfileDetailsScreen';
import ProductListingPage from '../screens/ProductListingPage';
import BottomTabs from '../components/HomeScreen/BottomTabs';
import {RootStackParamList} from '../props/prop';
import WishList from '../screens/Wishlist';
import Screen1 from '../screens/DrawerScreens/Screen1';
import Screen2 from '../screens/DrawerScreens/Screen2';
import Screen3 from '../screens/DrawerScreens/Screen3';
import Screen4 from '../screens/DrawerScreens/Screen4';
import CustomDrawer from '../components/CustomDrawer';
import {Dimensions} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = {
  headerShown: false,
};

const isUserLoggedIn: boolean = true;

const {width} = Dimensions.get('window');

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStackNavigator"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: width * 0.8,
        },
      }}>
      <Drawer.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const BottomTabsNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={() => <BottomTabs />}
      screenOptions={{headerShown: false}}>
      <BottomTab.Screen name="HomeScreen" component={HomeScreen} />
      <BottomTab.Screen
        name="ProductListingPage"
        component={ProductListingPage}
      />
      <BottomTab.Screen name="Wishlist" component={WishList} />
      <BottomTab.Screen name="CartScreen" component={CartScreen} />
      <BottomTab.Screen name="UserScreen" component={UserScreen} />
    </BottomTab.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="BottomTabsNavigator">
      <Stack.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
      />
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
          <Stack.Screen
            name="ProfileDetailsScreen"
            component={ProfileDetailsScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
