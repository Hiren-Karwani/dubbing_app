import React from 'react';
import { View, Text, StyleSheet, Linking, Button } from 'react-native';
import { Video } from 'expo-av';
import { Audio } from 'expo-av';

export default function Result({ route }) {
  const { type, content, audio, video, transcript } = route.params;

  return (
    <View style={styles.container}>
      {type === 'summary' ? (
        <>
          <Text style={styles.title}>Summary</Text>
          <Text style={styles.content}>{content}</Text>
          <Button title="Play Audio Summary" onPress={() => Audio.playAsync(audio)} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Dubbed Media</Text>
          <Video
            source={{ uri: video }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Transcript:</Text>
          <Text style={styles.content}>{transcript}</Text>
        </>
      )}
    </View>
  );
}

// Add styles...