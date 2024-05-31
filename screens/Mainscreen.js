import * as React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView } from "react-native";

const MainScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.homepage} source={require('../assets/HP.png')} />
      <View style={styles.overlay}>
        <View style={styles.topSection}>
          <Text style={styles.timelessTravelsBegin}>
            Timeless Travels
          </Text>
          <Text style={styles.getmoredone}>Get More Done</Text>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('SignupPage')}>
              <Text style={styles.signupButtonText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={styles.signinContainer}>
              <Text style={styles.text}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SigninPage')}>
                <Text style={styles.signin}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.orContainer}>
              <Text style={styles.orText}>Or</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.line}></View>

            <TouchableOpacity style={styles.socialButton} onPress={() => console.log("Sign in with Google pressed")}>
              <Image source={require("../assets/google.png")} style={styles.socialIcon} />
              <Text style={styles.socialText}>Sign up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={() => console.log("Sign up with Facebook pressed")}>
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
  },
  homepage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 80,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 100,

  },
  timelessTravelsBegin: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    color: 'white',
    paddingHorizontal: 10,
  },
  getmoredone: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: 'bold',
    color: 'lightgrey',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    marginTop: 10,
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
    backgroundColor: 'tomato',
    marginBottom: 20,
    elevation: 5,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  signinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'lightgrey',
  },
  signin: {
    fontSize: 16,
    color: 'tomato',
    fontWeight: 'bold',
    marginLeft: 7,
    textDecorationLine: 'underline',
  },
  orContainer: {
    marginBottom: 8,
  },
  orText: {
    fontSize: 18,
    color: 'lightgrey',
    fontWeight: 'bold',
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
  },
});

export default MainScreen;
