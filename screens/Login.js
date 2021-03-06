import {useNavigation} from '@react-navigation/native';
import {Realm, useApp} from '@realm/react';
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Login = () => {
  const [email, setEmail] = useState('sourabhbagrecha@gmail.com');
  const [password, setPassword] = useState('secret123');
  const nav = useNavigation();

  const app = useApp();

  const onSubmit = async () => {
    try {
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (error) {
      console.error(error);
    }
  };

  const onSignupClick = () => {
    nav.navigate('Signup');
  };

  return (
    <View style={styles}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Login</Text>
      </Pressable>
      <Pressable onPress={onSignupClick} style={styles.linkToSignup}>
        <Text style={styles.linkToSignupText}>
          Don't have an account? Signup
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 10,
    borderColor: '#000',
    borderWidth: 0.17,
    borderStyle: 'solid',
    paddingHorizontal: 10,
    borderRadius: 7,
    fontSize: 17,
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
    marginTop: 200,
    fontWeight: '700',
  },
  linkToSignup: ({pressed}) => ({
    marginTop: 5,
    marginRight: 10,
    opacity: pressed ? 0.5 : 1,
  }),
  linkToSignupText: {
    fontSize: 15,
    color: 'rgb(25, 118, 210)',
    textAlign: 'right',
  },
  submitButton: ({pressed}) => ({
    backgroundColor: 'rgb(25, 118, 210)',
    opacity: pressed ? 0.5 : 1,
    margin: 10,
    borderRadius: 7,
    padding: 10,
  }),
  submitButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Login;
