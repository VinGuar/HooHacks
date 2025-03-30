import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Try going back — fallback after a short delay if nothing happens
    router.back();

    // After a short delay, fallback to '/games' if still on the same route
    setTimeout(() => {
      router.push('/games'); // fallback route (change if needed)
    }, 250);
  };

  return (
    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
      <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 40,
    marginLeft: 20,
  },
  backText: {
    fontSize: 18,
    color: '#007AFF',
  },
});
