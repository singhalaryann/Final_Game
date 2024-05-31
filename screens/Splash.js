import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
const { width } = Dimensions.get('window');

const Splash = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'Michroma-Regular': require('../assets/fonts/Michroma-Regular.ttf'),
  });

  // // Render AppLoading until fonts are loaded
  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Rotate the image continuously and slowly
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 50000, // Adjust this value for slower continuous rotation
        useNativeDriver: true,
      })
    ).start();

    // Sequential animations
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

    // Blink animation for "TAP TO START" button
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
  }, [rotateAnim, textOpacity, imageOpacity, buttonOpacity]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return(
    <View style={styles.container}>
      <View style={styles.centeredContainer}>
        <Animated.Image
          style={[styles.image, { transform: [{ rotate: spin }], opacity: imageOpacity }]}
          source={require('../assets/KA2.png')}
        />
        <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
          <Text style={styles.mainText}>Swipe Kingdoms:</Text>
          <Text style={styles.subText}>KINGDOMS</Text>
        </Animated.View>
      </View>
      <TouchableOpacity style={styles.tapButton} onPress={() => navigation.navigate('MainScreen')}>
        <Animated.Text style={[styles.tapText, { opacity: buttonOpacity }]}>Tap TO START.</Animated.Text>
      </TouchableOpacity>
    </View>
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
    width: width * 0.8,
    height: width * 0.8,
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
  },
  tapButton: {
    position: 'absolute',
    bottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tapText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Michroma-Regular',
  },
});

export default Splash;