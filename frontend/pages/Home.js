import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Multi-Language AI Assistant</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Summarize')}
      >
        <Text style={styles.buttonText}>Summarize Document</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Dubbing')}
      >
        <Text style={styles.buttonText}>Dub Media File</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#2c3e50',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});