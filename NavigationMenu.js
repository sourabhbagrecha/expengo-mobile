import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from './contexts/AuthContext';
import Login from './screens/Login';
import CreateExpense from './screens/CreateExpense';
import Home from './screens/Home';

const NavigationMenu = () => {
  const Stack = createNativeStackNavigator();
  const {user} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="New" component={CreateExpense} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{title: 'Login'}}
              component={Login}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationMenu;
