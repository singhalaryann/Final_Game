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
    transform: [{ rotateY: flipAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    }) }],
  };

  const backAnimatedStyle = {
    opacity: backOpacity,
    transform: [{ rotateY: flipAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    }) }],
  };

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
        <Text style={styles.cardTitle}>{items.title}</Text>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 350,
    height: 450,
    margin: 60,
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
  cardTitle: {
    fontSize: 28,
    color: 'white',
    position: 'absolute',
    bottom: 55,
    left: 10,
    fontWeight: 'bold',
  },
});

export default Cards;
