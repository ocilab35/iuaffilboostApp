import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 
  const handleLogin = async () => {
    setError('');
    setSuccess('');
  
    // Validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters long.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.100.57:5000/api/auth/login', {
        email,
        password,
      });
  
      if (response.data.role === 'admin') {
        navigation.navigate('AdminHome');  // Redirect to admin panel if admin
      } else {
        if (!response.data.approved) {
          Alert.alert('Pending Approval', 'Your account is awaiting approval from the admin.');
        } else {
          navigation.navigate('Home');  // Redirect to regular home screen if approved
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.headerShape} />
      <Text style={styles.title}>SIGN IN</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Ionicons name="mail-outline" size={20} color="gray" />
        </View>
        <Text style={styles.label}>PASSWORD</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Ionicons name="lock-closed-outline" size={20} color="gray" />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText} >SIGN IN</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Don't have an account? <Text style={styles.linkText} onPress={() => navigation.navigate('SignUp')}>Sign up</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5EEE6', justifyContent: 'center', alignItems: 'center' },
  headerShape: { position: 'absolute', top: 0, left: 0, width: '100%', height: 200, backgroundColor: '#FF7C00', borderBottomRightRadius: 400 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, textDecorationLine: 'underline', textDecorationColor: '#FF7C00' },
  inputContainer: { width: '85%', marginTop: 20 },
  label: { fontSize: 14, marginTop: 15, fontWeight: 'bold' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'gray', marginBottom: 15 },
  input: { flex: 1, height: 40 },
  button: { backgroundColor: '#FF7C00', padding: 15, borderRadius: 30, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', textAlign: 'center', marginTop: 10 },
  success: { color: 'green', textAlign: 'center', marginTop: 10 },
  link: { textAlign: 'center', marginTop: 20 },
  linkText: { color: '#FF7C00', fontWeight: 'bold' },
});

export default LoginScreen;


