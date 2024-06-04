import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, PanResponder, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Cards from '../components/Cards';
import SettingsButton from '../components/SettingsButton';

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

const backImage = require('../assets/cardBack.png');

const Page1 = ({ navigation, route }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { activeButton } = route.params;
  const [currentButton, setCurrentButton] = useState(activeButton);
  const [cardsPlaced, setCardsPlaced] = useState(false);

  const swipe = useRef(new Animated.ValueXY()).current;
  const scales = useRef([]).current;
  const positions = useRef([]).current;
  const flipAnims = useRef([]).current;
  const currIndex = useRef(0);

  const readData = async () => {
    try {
      const data = require('../db.json').episodes[0].cards;
      let arr = [];
      let temp = {};
      for (let index = 0; index < data.length; index++) {
        const firstOrNot = data[index].agent[0] === activeButton;
        if (firstOrNot) {
          temp = {
            name: data[index].agent,
            isFirst: firstOrNot,
            question: data[index].content,
            choices: [data[index].choices.left.text, data[index].choices.right.text],
            image: getImageSource(data[index].agent[0]),
            isDecided: false,
          };
        } else {
          arr.push({
            name: data[index].agent,
            isFirst: firstOrNot,
            question: data[index].content,
            choices: [data[index].choices.left.text, data[index].choices.right.text],
            image: getImageSource(data[index].agent[0]),
            isDecided: false,
          });
        }
      }
      arr = [temp].concat(arr);
      setAgents(arr);
      setDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDataLoaded = useCallback(() => {
    if (dataLoaded && loading) {
      const staggerDelay = 200; // Delay between each card animation
      agents.forEach((_, index) => {
        scales[index] = new Animated.Value(0);
        positions[index] = new Animated.ValueXY({ x: -500, y: -800 });
        flipAnims[index] = new Animated.Value(0);
      });
      setLoading(false);

      agents.forEach((_, index) => {
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
            }),
          ]).start(() => {
            if (index >= agents.length - 1) {
              FlipNextCard();
            }
          });
        }, (agents.length - index - 1) * staggerDelay); // Apply staggered delay in reverse order
      });

      return () => {
        agents.forEach((_, index) => clearTimeout(index));
      };
    }
  }, [agents, loading, dataLoaded]);

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    handleDataLoaded();
  }, [agents, loading, dataLoaded])

  const FlipNextCard = () => {
    Animated.spring(flipAnims[currIndex.current], {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 10,
    }).start();
    setCardsPlaced(true);
  };

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
        }).start(() => removeCard(direction));
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 6,
        }).start();
      }
    },
  });

  const removeCard = useCallback((direction) => {
    console.log("Direction: ", direction);
    let arr = [...agents];
    let allComplete = true;
    arr.forEach((item, _) => {
      if (item.name[0] === currentButton) {
        item.isDecided = true;
      }
      if (!item.isDecided) {
        allComplete = false;
      }
    });

    if (allComplete) {
      navigation.navigate('Ep1', { animate: true });
      return;
    }

    var set = false;
    if(!allComplete) {
      arr.forEach((item, _) => {
        if(!set && !item.isDecided) {
          setCurrentButton(item.name[0]);
          set = true;
        }
      })
    }

    currIndex.current = currIndex.current + 1;
    setAgents(arr);
    FlipNextCard();

    swipe.setValue({ x: 0, y: 0 })
  }, [agents, currentButton, navigation, swipe]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
      {agents.map((item, index) => {
        const isFirst = item.isFirst;
        const isTop = (item.name[0] === currentButton);
        const dragHandlers = (isTop) ? panResponder.panHandlers : {};
        const cardStyle = {
          opacity: 1,
          transform: [
            { translateX: positions[index]?.x ?? 0 },
            { translateY: positions[index]?.y ?? 0 },
            { scale: scales[index] ?? 1 },
            ...(isTop ? swipe.getTranslateTransform() : [])
          ],
        };

        return (!item.isDecided &&
          <View key={index}>{
            isTop &&
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>{item.question}</Text>
          </View>
        }
            <Animated.View key={item.id} style={[styles.cardContainer, cardStyle]} {...dragHandlers}>
              <Cards backImage={backImage} items={item} isFirst={isFirst} swipe={swipe} flipAnim={flipAnims[index]} opacityAnim={flipAnims[index]} />
            </Animated.View>
          </View>
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
    backgroundColor: 'white',
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
    alignSelf: 'center',
    alignContent: 'center',
    padding: 10,
    borderRadius:20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 200
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  cardContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    top: 50
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page1;