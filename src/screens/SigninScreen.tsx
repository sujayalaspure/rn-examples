import { Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Button, ErrorText, Input } from '../components/Form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  headerText: {
    color: '#353031',
    fontWeight: 'bold',
    fontSize: 34,
    marginBottom: 10
  }
});

const SigninScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const submit = () => {
    if (!username || !password) {
      setErrorMsg('Please enter username and password');
      return;
    }
    setErrorMsg('');
    console.log('submit', { username, password });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position">
      <Text style={styles.headerText}>Login</Text>
      <Input
        label="Username"
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        error={errorMsg}
        testID="SignIn.usernameInput"
      />
      <Input
        label="Password"
        placeholder="***"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        error={errorMsg}
        testID="SignIn.passwordInput"
      />
      <ErrorText messages={[errorMsg]} />
      <Button testID="SignIn.Button" text="Login" onPress={submit} />
    </KeyboardAvoidingView>
  );
};

export default SigninScreen;
