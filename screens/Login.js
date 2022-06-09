import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('sourabhbagrecha@gmail.com');
  const [password, setPassword] = useState('secret123');

  const {signIn} = useAuth();

  const onSubmit = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error);
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
