// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import styles from './styles';

export default function App() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://192.168.55.181:3000/signup', { username, name, password });
      console.log('Registration successful:', response.data);
      setLoggedIn(true);
    } catch (error) {
      console.error('Registration failed:', error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.55.181:3000/login', { usernameLogin, passwordLogin });
      console.log('Login successful:', response.data);
      setLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
    }
  };

  const handleLogOut = async () => {
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <View>
          <Text style={styles.loggedInText}>{`Hi ${name}, you're logged in.`}</Text>
          <Button title="LogOut" onPress={handleLogOut} style={styles.logOutButton} />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.title}>Registration</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Button title="Register" onPress={handleRegistration} style={styles.button} />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={usernameLogin}
              onChangeText={(text) => setUsernameLogin(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={passwordLogin}
              onChangeText={(text) => setPasswordLogin(text)}
            />
            <Button title="Login" onPress={handleLogin} style={styles.button} />
          </View>
        </View>
      )}
    </View>
  );
}
