import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {Icon} from 'native-base';
import {Text} from 'react-native';

import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import LandingOne from './src/screens/LandingOne';
import LandingTwo from './src/screens/LandingTwo';
import Detail from './src/screens/Detail';
import MyBooks from './src/screens/MyBooks';
import Profile from './src/screens/Profile';
import Register from './src/screens/Register';

console.disableYellowBox = true;
const Tab = createBottomTabNavigator();
const {Navigator, Screen} = createStackNavigator();

const BottomTab = () => {
  const style = {style: {paddingBottom: 5, paddingTop: 5}};
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
      tabBarOptions={style}
      options={{
        tabBarOptions: {
          activeTintColor: 'red',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        tabBarOptions={{activeTintColor: '#e91e63'}}
        options={{
          tabBarLabel: ({focused}) => {
            const color = focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)';
            const size = 10;
            return <Text style={{color: color, fontSize: size}}>Home</Text>;
          },
          tabBarIcon: ({focused}) => {
            const color = focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)';
            return <Icon style={{color: color}} name="home" />;
          },
        }}
      />
      <Tab.Screen
        name="MyBooks"
        component={MyBooks}
        options={{
          tabBarLabel: ({focused}) => {
            const color = focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)';
            const size = 10;
            return <Text style={{color: color, fontSize: size}}>My Books</Text>;
          },
          tabBarIcon: ({focused}) => {
            const color = focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)';
            return <Icon style={{color: color}} name="book" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({focused}) => {
            const color = focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)';
            const size = 10;
            return <Text style={{color: color, fontSize: size}}>Logout</Text>;
          },
          tabBarIcon: ({focused}) => {
            const color = focused ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.2)';
            return <Icon style={{color: color}} name="exit" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Splash">
          <Screen name="Splash" component={Splash} />
          <Screen name="Home_" component={Home} />
          <Screen name="LandingOne" component={LandingOne} />
          <Screen name="LandingTwo" component={LandingTwo} />
          <Screen name="Home" component={BottomTab} />
          <Screen name="Detail" component={Detail} />
          <Screen name="Login" component={Login} />
          <Screen name="Register" component={Register} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
