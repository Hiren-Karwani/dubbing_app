import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import RNPickerSelect from 'react-native-picker-select';

export default function Dubbing() {
  const [file, setFile] = useState(null);
  const [lang, setLang] = useState('hi');
  const [processing, setProcessing] = useState(false);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['audio/*', 'video/*'],
      });
      if (result.type === 'success') setFile(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const processDubbing = async () => {
    if (!file) {
      Alert.alert('No File Selected', 'Please select a media file');
      return;
    }

    setProcessing(true);
    try {
      const response = await FileSystem.uploadAsync(
        'http://your-server:5000/dub',
        file.uri,
        {
          fieldName: 'file',
          httpMethod: 'POST',
          parameters: { lang },
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        }
      );

      const result = JSON.parse(response.body);
      navigation.navigate('Result', {
        type: 'dub',
        video: result.video_url,
        transcript: result.transcript
      });
    } catch (error) {
      Alert.alert('Error', 'Dubbing failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media Dubbing</Text>

      <TouchableOpacity style={styles.fileButton} onPress={pickFile}>
        <Text style={styles.buttonText}>
          {file ? file.name : 'Select Audio/Video File'}
        </Text>
      </TouchableOpacity>

      <RNPickerSelect
        onValueChange={(value) => setLang(value)}
        items={[
          { label: 'Hindi', value: 'hi' },
          { label: 'English', value: 'en' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' },
        ]}
        style={pickerStyles}
        placeholder={{ label: 'Select Target Language', value: null }}
      />

      {processing && <ActivityIndicator size="large" color="#3498db" />}

      <TouchableOpacity
        style={[styles.processButton, processing && styles.disabledButton]}
        onPress={processDubbing}
        disabled={processing}
      >
        <Text style={styles.buttonText}>Dub Media</Text>
      </TouchableOpacity>
    </View>
  );
}

// Add styles...