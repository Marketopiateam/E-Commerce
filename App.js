import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './components/drawerContent';
import React from "react";
import LoadingScreen from "./components/loadingScreen";
import AboutAppScreen from "./screens/aboutApp/aboutAppScreen";
import AccountScreen from "./screens/account/accountScreen";
import AccountSettingScreen from "./screens/accountSetting/accountSettingScreen";
import CreateAccountScreen from "./screens/auth/createAccountScreen";
import LoginScreen from "./screens/auth/loginScreen";
import ResetPasswordScreen from "./screens/auth/resetPasswordScreen";
import BagScreen from "./screens/bag/bagScreen";
import CategoryDetailScreen from "./screens/categoryDetail/categoryDetailScreen";
import DeliveryScreen from "./screens/delivery/deliveryScreen";
import FaqScreen from "./screens/faq/faqScreen";
import FilterScreen from "./screens/filter/filterScreen";
import HomeScreen from "./screens/home/homeScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import OnBoardingScreen from "./screens/onboarding/onBoardingScreen";
import OrdersScreen from "./screens/orders/ordersScreen";
import PaymentScreen from "./screens/payment/paymentScreen";
import ProductDetailScreen from "./screens/productDetail/productDetailScreen";
import ProductsScreen from "./screens/products/productsScreen";
import SearchScreen from "./screens/search/searchScreen";
import SizeChartScreen from "./screens/sizeChart/sizeChartScreen";
import SplashScreen from "./screens/splashScreen";
import WishlistScreen from "./screens/wishlist/wishlistScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false, }}
    >
      <Drawer.Screen name="Drawer" component={HomeScreen} options={{ ...TransitionPresets.DefaultTransition }} />
    </Drawer.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS, }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={DrawerNavigation} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Bag" component={BagScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Products" component={ProductsScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="SizeChart" component={SizeChartScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="AccountSetting" component={AccountSettingScreen} />
        <Stack.Screen name="Faq" component={FaqScreen} />
        <Stack.Screen name="AboutApp" component={AboutAppScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;