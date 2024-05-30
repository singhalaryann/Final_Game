import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const Cards = ({ items, isFirst, swipe, ...rest }) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });

  return (
    <Animated.View
      style={[styles.cardContainer, isFirst && { transform: [...swipe.getTranslateTransform(), { rotate }] }]}
      {...rest}
    >
      <Image style={styles.cardImage} source={items.image} />
      <Text style={styles.cardTitle}>{items.title}</Text>
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
    margin: 60,
  },
  cardImage: {
    width: 350,
    height: 450,
    borderRadius: 20,
    // resizeMode: 'contain'

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
