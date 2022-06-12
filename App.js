import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AuthProvider} from './contexts/AuthContext';
import NavigationMenu from './NavigationMenu';
import 'react-native-get-random-values';
import {CustomRealmProvider} from './contexts/RealmContext';
import {ExpenseProvider} from './contexts/ExpenseContext';

const App = () => {
  return (
    <View style={styles}>
      <AuthProvider>
        <CustomRealmProvider>
          <ExpenseProvider>
            <NavigationMenu />
          </ExpenseProvider>
        </CustomRealmProvider>
      </AuthProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: 1,
});

export default App;
