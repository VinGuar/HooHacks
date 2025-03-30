import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/home');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/Forest.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.35 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#000"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    color: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', 
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },  
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#000',
  },
  button: {
    backgroundColor: '#31572c',
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fefae0',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  error: {
    color: 'salmon',
    textAlign: 'center',
    marginBottom: 10,
  },
  link: {
    color: '#31572c',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});