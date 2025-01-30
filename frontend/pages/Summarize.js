import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import RNPickerSelect from 'react-native-picker-select';

export default function Summarize() {
  const [file, setFile] = useState(null);
  const [lang, setLang] = useState('en');
  const [processing, setProcessing] = useState(false);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'text/plain', 'audio/*', 'video/*'],
      });
      if (result.type === 'success') setFile(result);
    } catch (error) {
      Alert.alert('Error', 'Failed to pick file');
    }
  };

  const processFile = async () => {
    if (!file) {
      Alert.alert('No File Selected', 'Please select a file first');
      return;
    }

    setProcessing(true);
    try {
      const response = await FileSystem.uploadAsync(
        'http://your-server:5000/summarize',
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
        type: 'summary',
        content: result.summary,
        audio: result.audio_url 
      });
    } catch (error) {
      Alert.alert('Error', 'Processing failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document Summarizer</Text>

      <TouchableOpacity style={styles.fileButton} onPress={pickFile}>
        <Text style={styles.buttonText}>
          {file ? file.name : 'Select File (PDF/TXT/Audio/Video)'}
        </Text>
      </TouchableOpacity>

      <RNPickerSelect
        onValueChange={(value) => setLang(value)}
        items={[
          { label: 'English', value: 'en' },
          { label: 'Hindi', value: 'hi' },
          { label: 'Spanish', value: 'es' },
          { label: 'French', value: 'fr' },
        ]}
        style={pickerStyles}
        placeholder={{ label: 'Select Language', value: null }}
      />

      {processing && <ActivityIndicator size="large" color="#3498db" />}

      <TouchableOpacity
        style={[styles.processButton, processing && styles.disabledButton]}
        onPress={processFile}
        disabled={processing}
      >
        <Text style={styles.buttonText}>Generate Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

// Add styles and pickerStyles...