import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import Setting from '../screens/Setting'; 
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av'; // Import Audio component from Expo

const SettingsButton = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const animationRef = useRef(null);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Load sound effect in a useEffect hook
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('../assets/click-button.mp3'));
      soundRef.current = sound;
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const soundRef = useRef(null); // Reference to the sound effect

  const handlePress = async () => {
    // Play the sound effect when the button is pressed
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }

    if (isOverlayVisible) {
      if (animationRef.current) {
        animationRef.current.play(100, 0);
      }
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsOverlayVisible(false);
      });
    } else {
      setIsOverlayVisible(true);
      if (animationRef.current) {
        animationRef.current.play(0, 100);
      }
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <LottieView
          ref={animationRef}
          source={require('../assets/animations/anim.json')} // Ensure this path is correct
          loop={false}
          style={styles.lottie}
          speed={3}
        />
      </TouchableOpacity>

      {isOverlayVisible && (
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
          <View style={styles.settingsContainer}>
            <Setting navigation={navigation}/>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  button: {
    width: 50,
    height: 50,
  },
  lottie: {
    width: 50,
    height: 50,
  },
  overlay: {
    position: 'absolute',
    top: '200%',
    alignSelf: 'center',
    backfaceVisibility: 'hidden',
  },
  settingsContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
});

export default SettingsButton;
