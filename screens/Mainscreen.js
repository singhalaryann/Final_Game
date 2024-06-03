import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { Audio } from 'expo-av';

const MainScreen = ({ navigation }) => {
  const soundRef = useRef(null);

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

  const playSound = async () => {
    if (soundRef.current) {
      await soundRef.current.replayAsync();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.homepage} source={require('../assets/HP.png')} />
      <View style={styles.overlay}>
        <View style={styles.topSection}>
          <Text style={styles.timelessTravelsBegin}>Timeless Travels</Text>
          <Text style={styles.getmoredone}>Get More Done</Text>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.signupButton} 
              onPress={async () => { 
                await playSound(); 
                navigation.navigate('SignupPage');
              }}
            >
              <Text style={styles.signupButtonText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={styles.signinContainer}>
              <Text style={styles.text}>Already have an account?</Text>
              <TouchableOpacity 
                onPress={async () => { 
                  await playSound(); 
                  navigation.navigate('SigninPage');
                }}
              >
                <Text style={styles.signin}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.orContainer}>
              <Text style={styles.orText}>Or</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.line}></View>

            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={async () => { 
                await playSound(); 
                console.log("Sign up with Google pressed");
              }}
            >
              <Image source={require("../assets/google.png")} style={styles.socialIcon} />
              <Text style={styles.socialText}>Sign up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={async () => { 
                await playSound(); 
                console.log("Sign up with Facebook pressed");
              }}
            >
              <Image source={require("../assets/facebook.png")} style={styles.socialIcon} />
              <Text style={styles.socialText}>Sign up with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  homepage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 50,
  },
  timelessTravelsBegin: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#FF6F61',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    paddingHorizontal: 10,
    fontFamily: 'Michroma-Regular',
  },
  getmoredone: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
    color: 'lightgrey',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    marginTop: 10,
    fontFamily: 'Michroma-Regular',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  signupButton: {
    width: '90%',
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: '#FF6F61',
    marginBottom: 20,
    elevation: 5,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Michroma-Regular',
  },
  signinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'lightgrey',
    fontFamily: 'Michroma-Regular',
  },
  signin: {
    fontSize: 16,
    color: '#FF6F61',
    fontWeight: 'bold',
    marginLeft: 7,
    textDecorationLine: 'underline',
    fontFamily: 'Michroma-Regular',
  },
  orContainer: {
    marginBottom: 8,
  },
  orText: {
    fontSize: 18,
    color: 'lightgrey',
    fontWeight: 'bold',
    fontFamily: 'Michroma-Regular',
  },
  line: {
    width: '90%',
    height: 1,
    backgroundColor: 'lightgrey',
    marginVertical: 3,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 10,
    width: '90%',
    elevation: 5,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    // fontFamily: 'Michroma-Regular',
  },
});

export default MainScreen;
