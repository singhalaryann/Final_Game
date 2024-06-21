
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import Modal from 'react-native-modal';
import SettingsButton from '../components/SettingsButton';

const { height: windowHeight } = Dimensions.get('window');

const Episode = ({ navigation, route }) => {
  const [episodeData, setEpisodeData] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [shouldRunAnimation, setShouldRunAnimation] = useState(true);

  const headerScale = useRef(new Animated.Value(0)).current;
  const newsScales = Array.from({ length: 4 }).map(() => useRef(new Animated.Value(0)).current);
  const hasAnimated = useRef(false);
  const alreadyAnimated = useRef(false);

  const runAnimation = useCallback(() => {
    Animated.stagger(200, [
      Animated.spring(headerScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 10,
      }),
      ...newsScales.map(scale =>
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 5,
          tension: 10,
        })
      ),
    ]).start();
  }, [headerScale, newsScales]);

  const readData = async () => {
    // try {
    //   const response = await fetch('path/to/your/file.json');
    //   const json = await response.json();
    //   setEpisodeData(json);
    //   console.log(episodeData)
    // } catch (error) {
    //   console.error('Error reading JSON file:', error);
    // }
    const data = require('../db.json').episodes[0];
    setEpisodeData(data);
  };
  
  useFocusEffect(
    useCallback(() => {
      if (!shouldRunAnimation) {
        return;
      } else {
        setActiveButton(null);

        if (!alreadyAnimated.current) {
          headerScale.setValue(0);
          newsScales.forEach(scale => scale.setValue(0));
          hasAnimated.current = false;
        } else {
          alreadyAnimated.current = false;
        }
        if (!hasAnimated.current) {
          runAnimation();
          readData();
          hasAnimated.current = true;
          alreadyAnimated.current = false;
        }
      }
    }, [shouldRunAnimation, runAnimation, headerScale, newsScales])
  );

  const handleModalClose = () => {
    alreadyAnimated.current = true;
    setShouldRunAnimation(true);
  }

  const handlePress = (button) => {
    setActiveButton(button);
    navigation.navigate('Page1', { activeButton: button });
  };

  const handleLongPressIn = (button) => {
    setShouldRunAnimation(false);
    setModalContent(button);
    setActiveButton(button);
    setIsModalVisible(true);
  };

  const handleLongPressOut = () => {
    setModalContent(null);
    setActiveButton(null);
    setIsModalVisible(false);
  };

  const renderButton = (label) => {
    const isActive = activeButton === label;
    const isLongPressed = modalContent === label;
    return (
      <View key={label} style={styles.buttonContainer}>
        <Text style={styles.buttonLabel}>{label}</Text>
        <TouchableOpacity
          style={[
            styles.roundButton,
            isActive && styles.activeButton,
            isLongPressed && styles.longPressButton
          ]}
          onPress={() => handlePress(label)}
          onLongPress={() => handleLongPressIn(label)}
          onPressOut={() => handleLongPressOut()}
          activeOpacity={0.7}
        >
          {/* Empty container, button label is outside */}
        </TouchableOpacity>
      </View>
    );
  };

  const renderModalContent = () => {
    let content = null;
    switch (modalContent) {
      case 'R':
        content = (
          <>
            <Text style={styles.modalTitle}>Religious Leader</Text>
            <Image style={styles.modalImage} source={require('../assets/RL.png')} />
            <Text style={styles.modalText}>Guidance and spiritual leadership for the kingdom.</Text>
            <Text style={styles.modalText}>Current Stats: {episodeData?.initial_stats.religion}.</Text>
          </>
        );
        break;
      case 'S':
        content = (
          <>
            <Text style={styles.modalTitle}>Society Leader</Text>
            <Image style={styles.modalImage} source={require('../assets/SL.png')} />
            <Text style={styles.modalText}>Responsible for social welfare and community well-being.</Text>
            <Text style={styles.modalText}>Current Stats: {episodeData?.initial_stats.society}.</Text>
          </>
        );
        break;
      case 'E':
        content = (
          <>
            <Text style={styles.modalTitle}>Economy Leader</Text>
            <Image style={styles.modalImage} source={require('../assets/EL.png')} />
            <Text style={styles.modalText}>Manages economic policies and financial stability.</Text>
            <Text style={styles.modalText}>Current Stats: {episodeData?.initial_stats.society}.</Text>
          </>
        );
        break;
      case 'M':
        content = (
          <>
            <Text style={styles.modalTitle}>Military Leader</Text>
            <Image style={styles.modalImage} source={require('../assets/MLL.png')} />
            <Text style={styles.modalText}>Manages military stability.</Text>
            <Text style={styles.modalText}>Current Stats: {episodeData?.initial_stats.economics}.</Text>
          </>
        );
        break;
      default:
        content = null;
    }
    return content;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.header, { transform: [{ scale: headerScale }] }]}>
          <Text style={styles.headerText}>
            {episodeData?.main_country_state}
          </Text>
        </Animated.View>
        <View style={styles.newsContainer}>
          {[
            episodeData?.current_activities.military,
            episodeData?.current_activities.religion,
            episodeData?.current_activities.society,
            episodeData?.current_activities.economics
          ].map((text, index) => (
            <Animated.View key={index} style={[styles.newsContainer, { transform: [{ scale: newsScales[index] }] }]}>
              <Text style={styles.newsText}>{text}</Text>
            </Animated.View>
          ))}
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {['M', 'R', 'E', 'S'].map(renderButton)}
      </View>
      <Modal
        isVisible={isModalVisible && modalContent !== null}
        backdropOpacity={0.5}
        onBackdropPress={() => setIsModalVisible(false)}
        onModalHide={() => handleModalClose()}
        animationIn="zoomIn"
        animationOut="zoomOut"
        style={styles.modal}
      >
        <View style={styles.innerModalContainer}>
          {renderModalContent()}
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    position: 'absolute',
    top: 50,
  },
  icon: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: '40%',
    height: '60%',
  },
  header: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  newsContainer: {
    width: '90%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  newsText: {
    padding: 10,
    marginVertical: 5,
    textAlign: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    borderWidth: 2,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20,
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
  longPressButton: {
    backgroundColor: 'blue',
  },
  buttonLabel: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    bottom: 60,
  },
  innerModalContainer: {
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    borderWidth: 2,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  modalText: {
    fontSize: 18,
    marginVertical: 2,
    textAlign: 'center',
  },
});

export default Episode;
