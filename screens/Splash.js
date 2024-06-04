import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'expo-font';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const Splash = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Michroma-Regular': require('../assets/fonts/Michroma-Regular.ttf'),
  });

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(require('../assets/click-button.mp3'));
      soundRef.current = sound;
    };

    loadSound();

    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 50000,
        useNativeDriver: true,
      })
    ).start();

    Animated.sequence([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [rotateAnim, textOpacity, imageOpacity, buttonOpacity]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handlePress = async () => {
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }
    navigation.navigate('MainScreen', { screen: 'MainScreen' });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <Animated.Image
            style={[styles.image, { transform: [{ rotate: spin }], opacity: imageOpacity }]}
            source={require('../assets/logo.png')}
          />
          <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
            <Text style={styles.mainText}>Swipe Kingdoms:</Text>
            <Text style={styles.subText}>KINGDOMS</Text>
          </Animated.View>
        </View>
        <Animated.Text style={[styles.tapText, { opacity: buttonOpacity }]}>Tap TO START.</Animated.Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    position: 'absolute',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Michroma-Regular',
  },
  subText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Michroma-Regular',
    marginTop: -10,
  },
  tapText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Michroma-Regular',
    position: 'absolute',
    bottom: 50,
  },
});

export default Splash;
