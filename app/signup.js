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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace('/home'); // Go to home after signup
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
        <Text style={styles.title}>Sign Up</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password (6+ characters)"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.link}>Already have an account? Log in</Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#31572c',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  input: {
    backgroundColor: 'rgba(fff, fff, fff, 0.15)',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
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