import {Realm, useApp} from '@realm/react';
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('sourabhbagrecha@gmail.com');
  const [password, setPassword] = useState('secret123');

  const app = useApp();

  const onSubmit = async () => {
    try {
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  padding: 10,
});

export default Login;
