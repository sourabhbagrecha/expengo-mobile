import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Analytics from './screens/Analytics';
import EditExpense from './screens/EditExpense';
import CreateExpense from './screens/CreateExpense';
import Profile from './screens/Profile';

const HomeMenu = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="New" component={CreateExpense} />
        <Stack.Screen name="Edit" component={EditExpense} />
      </>
    </Stack.Navigator>
  );
};

const AnalyticsMenu = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Analytics}
      />
    </Stack.Navigator>
  );
};

const ProfileMenu = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Profile}
      />
    </Stack.Navigator>
  );
};

const BottomMenu = () => {
  const Tabs = createBottomTabNavigator();
  const BottomTabIcon = props => (
    <Text style={styles.bTabIcon}>{props.icon}</Text>
  );
  return (
    <Tabs.Navigator screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="Main"
        component={HomeMenu}
        options={{tabBarIcon: () => <BottomTabIcon icon={'🏠'} />}}
      />
      <Tabs.Screen
        name="Analytics"
        component={AnalyticsMenu}
        options={{tabBarIcon: () => <BottomTabIcon icon={'📈'} />}}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileMenu}
        options={{tabBarIcon: () => <BottomTabIcon icon={'🤖'} />}}
      />
    </Tabs.Navigator>
  );
};

const AuthNavMenu = () => {
  return (
    <NavigationContainer>
      <BottomMenu />
    </NavigationContainer>
  );
};

const UnAuthNavMenu = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen
            name="Login"
            options={{title: 'Login'}}
            component={Login}
          />
          <Stack.Screen
            name="Signup"
            options={{title: 'Signup'}}
            component={Signup}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bTabIcon: {
    fontSize: 30,
  },
});

export {UnAuthNavMenu, AuthNavMenu};
