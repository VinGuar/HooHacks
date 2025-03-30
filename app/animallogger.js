import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, Button, FlatList, StyleSheet,
  TouchableOpacity, KeyboardAvoidingView, Platform,
  TouchableWithoutFeedback, Keyboard
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

  // Listen for live auth updates
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('🔄 Auth state changed. Current user:', firebaseUser?.email || 'None');
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // Fetch Firestore logs for logged-in user
  useEffect(() => {
    if (!user) {
      setLogs([]); // reset when logged out
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onClick={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Animal Logger</Text>

          <TextInput
            value={animal}
            onChangeText={setAnimal}
            placeholder="Enter animal name"
            style={styles.input}
          />
          <Button title="Log Animal" onPress={handleLog} />

          <FlatList
            data={combinedLogs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.item}>• {item.name}</Text>
            )}
            ListEmptyComponent={<Text style={styles.placeholder}>No animals logged yet.</Text>}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          {/* ✅ Always render the login button if not logged in */}
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-start' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff', // ensure it's not transparent
  },
  item: { fontSize: 18, paddingVertical: 4 },
  placeholder: { textAlign: 'center', marginTop: 20, fontStyle: 'italic', color: 'gray' },
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

