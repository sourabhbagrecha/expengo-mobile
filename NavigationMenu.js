import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateExpense from './screens/CreateExpense';
import Home from './screens/Home';
import EditExpense from './screens/EditExpense';
import Login from './screens/Login';
import Signup from './screens/Signup';

const AuthNavMenu = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="New" component={CreateExpense} />
          <Stack.Screen name="Edit" component={EditExpense} />
        </>
      </Stack.Navigator>
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

export {UnAuthNavMenu, AuthNavMenu};
