import React from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

const Help = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.sectionTitle}>Game Overview</Text>
        <Text style={styles.text}>
          Welcome to The Kingdom! In this game, you will take on the role of a monarch
          and make decisions to lead your kingdom to prosperity. Your choices will affect
          the kingdom's economy, military strength, societal well-being, and religious harmony.
        </Text>
        <Text style={styles.sectionTitle}>How to Play</Text>
        <Text style={styles.subSectionTitle}>Controls</Text>
        <Text style={styles.text}>
          - Swipe left or right to make decisions.
          {"\n"}- Tap on icons to interact with different elements of the game.
        </Text>
        <Text style={styles.subSectionTitle}>Gameplay Mechanics</Text>
        <Text style={styles.text}>
          - Each decision you make will affect the kingdom's stats.
          {"\n"}- Keep an eye on the stats to maintain a balanced and thriving kingdom.
          {"\n"}- Progress through episodes and experience the evolving story based on your decisions.
        </Text>
        <Text style={styles.subSectionTitle}>Scoring</Text>
        <Text style={styles.text}>
          - Your success is measured by the stability and prosperity of your kingdom.
          {"\n"}- Aim to keep all stats balanced for the best outcome.
        </Text>
        <Text style={styles.sectionTitle}>Tips & Tricks</Text>
        <Text style={styles.text}>
          - Pay attention to the advisors' recommendations.
          {"\n"}- Consider the long-term effects of your decisions.
          {"\n"}- Balance your resources wisely to avoid crises.
        </Text>
        <Text style={styles.sectionTitle}>FAQ</Text>
        <Text style={styles.subSectionTitle}>Q: How do I save my progress?</Text>
        <Text style={styles.text}>
          A: The game automatically saves your progress after each decision.
        </Text>
        <Text style={styles.subSectionTitle}>Q: Can I replay episodes?</Text>
        <Text style={styles.text}>
          A: Yes, you can replay episodes from the Levels Page to explore different outcomes.
        </Text>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <Text style={styles.text}>
          If you encounter any issues, please contact our support team at support@thekingdomgame.com.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Michroma-Regular',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Michroma-Regular',
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Michroma-Regular',
  },
  text: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    fontFamily: 'Michroma-Regular',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingVertical: 15,
    backgroundColor: 'tomato',
    borderRadius: 30,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Michroma-Regular',
  },
});

export default Help;
