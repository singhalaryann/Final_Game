import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const Cards = ({ items, backImage, isFirst, swipe, flipAnim, ...rest }) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1, 0],
  });

  const frontAnimatedStyle = {
    opacity: frontOpacity,
    transform: [{
      rotateY: flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
      })
    }],
  };

  const backAnimatedStyle = {
    opacity: backOpacity,
    transform: [{
      rotateY: flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
      })
    }],
  };

  const choice1Opacity = swipe.x.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const choice2Opacity = swipe.x.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.cardContainer, isFirst && { transform: [...swipe.getTranslateTransform(), { rotate }] }]}
      {...rest}
    >
      <Animated.View style={[styles.cardInner, styles.cardBackContainer, backAnimatedStyle]}>
        <Image style={styles.cardImage} source={backImage} />
      </Animated.View>
      <Animated.View style={[styles.cardInner, frontAnimatedStyle]}>
        <Image style={styles.cardImage} source={items.image} />
        <View style={styles.textContainer}>
          <Animated.Text style={[styles.cardChoice, styles.cardChoice1, { opacity: choice1Opacity }]}>
            {items.choiceL}
          </Animated.Text>
          <Animated.Text style={[styles.cardChoice, styles.cardChoice2, { opacity: choice2Opacity }]}>
            {items.choiceR}
          </Animated.Text>
          <Text style={styles.cardTitle}>{items.title}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    width: 350,
    height: 450,
    margin: 60,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  cardInner: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardBackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 5,
  },
  cardTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardChoice: {
    position: 'absolute',
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
  cardChoice1: {
    bottom: 380,
    left: 20,
  },
  cardChoice2: {
    bottom: 380,
    right: 20,
  },
});

export default Cards;
