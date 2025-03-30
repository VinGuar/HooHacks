// app/animallogger.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebaseconfig';

export default function AnimalLoggerScreen() {
  const [animal, setAnimal] = useState('');
  const [logs, setLogs] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'animal_logs'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLogs(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLog = async () => {
    if (animal.trim() === '') return;

    await addDoc(collection(db, 'animal_logs'), {
      uid: user.uid,
      name: animal.trim(),
      timestamp: new Date(),
    });

    setAnimal('');
  };

  return (
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
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>• {item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 10 },
  item: { fontSize: 18, paddingVertical: 4 },
});
