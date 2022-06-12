import React from 'react';
import {View, StyleSheet} from 'react-native';
import {AppProvider, UserProvider} from '@realm/react';
import 'react-native-get-random-values';
import {ExpenseProvider} from './contexts/ExpenseContext';
import {CustomRealmProvider} from './contexts/RealmContext';
import {appId} from './realm/realmApp';
import {AuthNavMenu, UnAuthNavMenu} from './NavigationMenu';

const App = () => {
  return (
    <View style={styles}>
      <AppProvider id={appId}>
        <UserProvider fallback={UnAuthNavMenu}>
          <CustomRealmProvider>
            <ExpenseProvider>
              <AuthNavMenu />
            </ExpenseProvider>
          </CustomRealmProvider>
        </UserProvider>
      </AppProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: 1,
});

export default App;
