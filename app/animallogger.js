import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, FlatList, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard, ImageBackground
} from 'react-native';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebaseconfig';
import { useRouter } from 'expo-router';

export default function AnimalLoggerScreen() {
  const [animal, setAnimal] = useState('');
  const [logs, setLogs] = useState([]);
  const [tempLogs, setTempLogs] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('🔄 Auth state changed. Current user:', firebaseUser?.email || 'None');
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setLogs([]);
      return;
    }

    const q = query(collection(db, 'animal_logs'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLog = async () => {
    if (animal.trim() === '') return;

    const entry = {
      name: animal.trim(),
      timestamp: new Date(),
    };

    if (user) {
      console.log('✅ Logging to Firebase');
      await addDoc(collection(db, 'animal_logs'), {
        ...entry,
        uid: user.uid,
      });
    } else {
      console.log('📝 Logging locally');
      setTempLogs(prev => [...prev, { id: Date.now().toString(), ...entry }]);
    }

    setAnimal('');
  };

  const combinedLogs = user ? logs : tempLogs;

  return (
    <ImageBackground
      source={require('../assets/images/Forest.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.3 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>🐾 Animal Logger</Text>

            <TextInput
              value={animal}
              onChangeText={setAnimal}
              placeholder="Enter animal name"
              style={styles.input}
              placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.button} onPress={handleLog}>
              <Text style={styles.buttonText}>Log Animal</Text>
            </TouchableOpacity>

            <FlatList
              data={combinedLogs}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text style={styles.item}>• {item.name}</Text>
              )}
              ListEmptyComponent={
                <Text style={styles.placeholder}>No animals logged yet.</Text>
              }
              contentContainerStyle={{ paddingBottom: 100 }}
            />

            {!user && (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push('/login')}
              >
                <Text style={styles.loginButtonText}>Login to Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e9edc9',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    width: '100%',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#31572c',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fefae0',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  item: {
    fontSize: 18,
    color: '#fff',
    paddingVertical: 4,
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#228B22',
  },
  loginButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 4,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
