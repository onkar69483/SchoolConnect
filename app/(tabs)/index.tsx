import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useEffect } from 'react';

export default function HomeScreen() {
  const API_URL = "https://school-connect-server.vercel.app"
  const fetchApi = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>School Connect!</ThemedText>
      <HelloWave />
      <ThemedView style={styles.infoContainer}>
        <ThemedText type="subtitle" style={styles.subtitle}>Welcome to School Connect!</ThemedText>
        <ThemedText style={styles.description}>
          Connect with students, teachers, and parents effortlessly. Explore our features to enhance your school experience.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F9FC', // light background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reactLogo: {
    height: 150,
    width: 250,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 20,
  },
});
