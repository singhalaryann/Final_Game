import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, PanResponder, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Cards from '../components/Cards';
import SettingsButton from '../components/SettingsButton';

const getImageSource = (activeButton) => {
  switch (activeButton) {
    case 'M':
      return require('../assets/Mil.png');
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

const backImage = require('../assets/logo.png');

const Page1 = ({ navigation, route }) => {
  const { activeButton } = route.params;
  const [currentButton, setCurrentButton] = useState(activeButton);
  const [cardsPlaced, setCardsPlaced] = useState(false);

  const remainingCards = ['M', 'R', 'E', 'S'].filter(button => button !== activeButton);

  const initialData = [
    { image: getImageSource(activeButton), id: 1, title: `${activeButton} Leader`, question: "Do you want to proceed?", choiceL: "Yes", choiceR: "No" },
    { image: getImageSource(remainingCards[0]), id: 2, title: `${remainingCards[0]} Leader`, question: "Is this the right choice?", choiceL: "Yes", choiceR: "No" },
    { image: getImageSource(remainingCards[1]), id: 3, title: `${remainingCards[1]} Leader`, question: "Are you sure about this?", choiceL: "Yes", choiceR: "No" },
    { image: getImageSource(remainingCards[2]), id: 4, title: `${remainingCards[2]} Leader`, question: "Will you take this path?", choiceL: "Yes", choiceR: "No" },
  ];

  const [data, setData] = useState(initialData);

  const swipe = useRef(new Animated.ValueXY()).current;
  const scales = initialData.map(() => useRef(new Animated.Value(0)).current);
  const positions = initialData.map(() => useRef(new Animated.ValueXY({ x: -500, y: -800 })).current);
  const flipAnims = initialData.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    const staggerDelay = 200; // Delay between each card animation
    initialData.forEach((_, index) => {
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(positions[index], {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            friction: 5,
            tension: 10,
          }),
          Animated.spring(scales[index], {
            toValue: 1,
            useNativeDriver: true,
            friction: 5,
            tension: 10,
          }),]).start(() => {
          // Start flip animation only for the first card
          if (index === 0) {
            Animated.spring(flipAnims[index], {
              toValue: 1,
              useNativeDriver: true,
              friction: 5,
              tension: 10,
            }).start();
          } else {
            // Add a delay for other cards
            setTimeout(() => {
              flipAnims[index].setValue(1);
              if (index >= 3) {
                setCardsPlaced(true);
              }
            }, staggerDelay * 2 * index); // Apply staggered delay
          }
        });
      }, (initialData.length - index - 1) * staggerDelay); // Apply staggered delay in reverse order
    });

    return () => {
      initialData.forEach((_, index) => clearTimeout(index));
    };
  }, [cardsPlaced]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => cardsPlaced,
    onMoveShouldSetPanResponder: () => cardsPlaced,
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

        // Flip the next card silently
        Animated.spring(flipAnims[1], {
          toValue: 1,
          useNativeDriver: true,
          friction: 5,
          tension: 10,
        }).start();
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
          <Text style={styles.cardTitle}>{data[0].question}</Text>
        </View>
      )}
      {data.map((item, index) => {
        const isFirst = index === 0;
        const dragHandlers = isFirst ? panResponder.panHandlers : {};
        const cardStyle = {
          transform: [
            { translateX: positions[index].x },
            { translateY: positions[index].y },
            { scale: scales[index] },
            ...(isFirst ? swipe.getTranslateTransform() : [])
          ],
        };

        return (
          <Animated.View key={item.id} style={[styles.cardContainer, cardStyle]} {...dragHandlers}>
            <Cards backImage={backImage} items={item} isFirst={isFirst} swipe={swipe} flipAnim={flipAnims[index]} />
          </Animated.View>
        );
      }).reverse()}
      <View style={styles.iconsContainer}>
        <SettingsButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    top: 50,
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
    backgroundColor: '#28a745',
  },
  buttonLabel: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardTitleContainer: {
    position: 'absolute',
    top: 150,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  cardContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Page1;
