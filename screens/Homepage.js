import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, Animated } from "react-native";
import { Audio } from 'expo-av';
import SettingsButton from "../components/SettingsButton";

const Homepage = ({ navigation }) => {
  const buttonScale = new Animated.Value(1);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/click-button.mp3'));
    await sound.playAsync();
  };

  const onPressIn = () => {
    playSound();
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonStyle = {
    transform: [{ scale: buttonScale }],
  };

  return (
    <ImageBackground
      source={require('../assets/HP.png')}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.homepage}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to The Kingdom</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Animated.View style={[styles.buttonWrapper, buttonStyle]}>
            <TouchableOpacity
              style={[styles.button, styles.firstButton]}
              onPress={() => navigation.navigate('LevelsPage')}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            >
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.buttonWrapper, buttonStyle]}>
            <TouchableOpacity
              style={[styles.button, styles.secondButton]}
              onPress={() => navigation.navigate('')}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.buttonWrapper, buttonStyle]}>
            <TouchableOpacity
              style={[styles.button, styles.thirdButton]}
              onPress={() => navigation.navigate('HelpPage')}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            >
              <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.headerContainer}>
          <SettingsButton />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  homepage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 20,
  },
  settingImage: {
    width: 40,
    height: 40,
    tintColor: 'lightgrey',
  },
  bookImage: {
    width: 42,
    height: 42,
    tintColor: 'lightgrey',
  },
  titleContainer: {
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Michroma-Regular',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginVertical: 10,
  },
  button: {
    width: 250,
    paddingVertical: 20,
    borderRadius: 30,
    marginVertical: 10,
    elevation: 5,
  },
  firstButton: {
    backgroundColor: 'tomato',
  },
  secondButton: {
    backgroundColor: 'dodgerblue',
  },
  thirdButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'lightgrey',
    textAlign: 'center',
    fontFamily: 'Michroma-Regular',
  },
});

export default Homepage;
