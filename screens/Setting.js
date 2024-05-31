import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get('window');

const Setting = ({ navigation }) => {
  const [sound, setSound] = useState(0.5);
  const [graphics, setGraphics] = useState(0.5);
  const [sfx, setSfx] = useState(0.5);
  const [quality, setQuality] = useState('medium');

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <Text style={styles.title}>SETTINGS</Text>
        
        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Sound</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={sound}
            onValueChange={(value) => setSound(value)}
            minimumTrackTintColor="#FFA500"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#FFA500"
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Graphics</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={graphics}
            onValueChange={(value) => setGraphics(value)}
            minimumTrackTintColor="#FFA500"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#FFA500"
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>SFX</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={sfx}
            onValueChange={(value) => setSfx(value)}
            minimumTrackTintColor="#FFA500"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#FFA500"
          />
        </View>

        <View style={styles.qualityContainer}>
          <Text style={styles.label}>Quality</Text>
          {['low', 'medium', 'high'].map((q) => (
            <TouchableOpacity key={q} onPress={() => setQuality(q)}>
              <Text style={[styles.qualityText, quality === q && styles.qualityTextSelected]}>{q}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => console.log("OK pressed")}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4e7d1',
  },
  settingsContainer: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: 'white',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: 100,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  slider: {
    flex: 1,
  },
  qualityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  qualityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  qualityTextSelected: {
    color: '#FFA500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    width: '45%',
    paddingVertical: 10,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutButton: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Setting;
