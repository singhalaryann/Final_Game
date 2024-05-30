import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, PanResponder, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Cards from '../components/Cards';

const getImageSource = (activeButton) => {
  switch (activeButton) {
    case 'M':
      return require('../assets/MLL.png');
    case 'R':
      return require('../assets/RLL.png');
    case 'E':
      return require('../assets/EL.png');
    case 'S':
      return require('../assets/SL.png');
    default:
      return null;
  }
};

const Page1 = ({ navigation, route }) => {
  const { activeButton } = route.params;
  const [currentButton, setCurrentButton] = useState(activeButton);

  const remainingCards = ['M', 'R', 'E', 'S'].filter(button => button !== activeButton);

  const initialData = [
    { image: getImageSource(activeButton), id: 1, title: `${activeButton} Leader`, about: 'Your chosen path begins here.' },
    { image: getImageSource(remainingCards[0]), id: 2, title: `${remainingCards[0]} Leader`, about: 'This is an AI-generated card.' },
    { image: getImageSource(remainingCards[1]), id: 3, title: `${remainingCards[1]} Leader`, about: 'This is another AI-generated card.' },
    { image: getImageSource(remainingCards[2]), id: 4, title: `${remainingCards[2]} Leader`, about: 'This is yet another AI-generated card.' },
  ];

  const [data, setData] = useState(initialData);

  const swipe = useRef(new Animated.ValueXY()).current;
  const scales = initialData.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    const staggerDelay = 200; // Delay between each card animation
    const animations = initialData.map((_, index) => {
      return setTimeout(() => {
        Animated.spring(scales[index], {
          toValue: 1,
          useNativeDriver: true,
          friction: 5,
          tension: 10,
        }).start();
      }, (initialData.length - index - 1) * staggerDelay); // Apply staggered delay in reverse order
    });

    return () => {
      // Clear timeouts if component unmounts before all animations are completed
      animations.forEach(animation => clearTimeout(animation));
    };
  }, []);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy }) => {
      swipe.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 180;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: { x: 600 * direction, y: dy },
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 6,
        }).start();
      }
    },
  });

  const removeCard = useCallback(() => {
    setData((prevState) => {
      if (prevState.length > 1) {
        const nextCard = prevState[1].title.split(' ')[0].charAt(0);
        setCurrentButton(nextCard);
      }
      return prevState.slice(1);
    });
    swipe.setValue({ x: 0, y: 0 });
    if (data.length === 1) {
      navigation.navigate('Ep1', { animate: true });
    }
  }, [data.length, navigation, swipe]);

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <Image style={styles.icon} source={require('../assets/setting.png')} />
        <Image style={styles.icon} source={require('../assets/slider.png')} />
      </View>
      <View style={styles.buttonsContainer}>
        {['M', 'R', 'E', 'S'].map((label) => (
          <View key={label} style={styles.buttonContainer}>
            <Text style={styles.buttonLabel}>{label}</Text>
            <TouchableOpacity
              style={[
                styles.roundButton,
                currentButton === label && styles.activeButton
              ]}
              activeOpacity={1} // Remove interactivity
            >
              {/* Empty container, button label is outside */}
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {data.length > 0 && (
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{data[0].title}</Text>
        </View>
      )}
      {data.map((item, index) => {
        const isFirst = index === 0;
        const dragHandlers = isFirst ? panResponder.panHandlers : {};
        const cardStyle = {
          transform: [
            { scale: scales[index] },
            ...(isFirst ? swipe.getTranslateTransform() : [])
          ],
        };

        return (
          <Animated.View key={item.id} style={[styles.cardContainer, cardStyle]} {...dragHandlers}>
            <Cards items={item} isFirst={isFirst} swipe={swipe} />
          </Animated.View>
        );
      }).reverse()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100, // Added padding to ensure the card doesn't cover the top text
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    top: 50,
  },
  icon: {
    width: 40,
    height: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    bottom: 20,
    position: 'absolute',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  roundButton: {
    backgroundColor: '#666',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  activeButton: {
    backgroundColor: 'green',
  },
  buttonLabel: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardTitleContainer: {
    position: 'absolute',
    top: 80,  // Adjusted to match the new card size
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  cardContainer: {
    position: 'absolute',
    top: 60,  // Increased top value to provide more space for the text above
    width: '100%',
    alignItems: 'center',
  },
});

export default Page1;
