import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const { height: windowHeight } = Dimensions.get('window');

const Episode = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handlePress = (button) => {
    setActiveButton(button);
    navigation.navigate('Page1', { activeButton: button });
  };

  const handleLongPressIn = (button) => {
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
          </>
        );
        break;
      case 'S':
        content = (
          <>
            <Text style={styles.modalTitle}>Society Leader</Text>
            <Image style={styles.modalImage} source={require('../assets/SL.png')} />
            <Text style={styles.modalText}>Responsible for social welfare and community well-being.</Text>
          </>
        );
        break;
      case 'E':
        content = (
          <>
            <Text style={styles.modalTitle}>Economy Leader</Text>
            <Image style={styles.modalImage} source={require('../assets/EL.png')} />
            <Text style={styles.modalText}>Manages economic policies and financial stability.</Text>
          </>
        );
        break;
      case 'M':
        content = (
          <>
            <Text style={styles.modalTitle}>Military Leader</Text>
            <Image style={styles.modalImage} source={require('../assets/MLL.png')} />
            <Text style={styles.modalText}>Manages military stability.</Text>
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
      <View style={styles.iconsContainer}>
        <Image style={styles.icon} source={require('../assets/setting.png')} />
        <Image style={styles.icon} source={require('../assets/slider.png')} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Monarch's Ascension Heralds New Era for the Kingdom</Text>
        </View>
        <View style={styles.newsContainer}>
          <Text style={styles.newsText}>Treasury Concerns Loom Over Upcoming Coronation</Text>
          <Text style={styles.newsText}>Rising Tensions with Neighboring Kingdoms</Text>
          <Text style={styles.newsText}>Calls for Social Reforms Echo Throughout the Kingdom</Text>
          <Text style={styles.newsText}>Internal Dissent Casts Shadow on Coronation Festivities</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {['M', 'R', 'E', 'S'].map(renderButton)}
      </View>

      {/* Modal */}
      {/* <Modal
        isVisible={isModalVisible && modalContent !== null}
        backdropOpacity={0.5}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <View style={styles.innerModalContainer}>
          {renderModalContent()}
        </View>
      </Modal> */}


      {/* <Modal
  isVisible={isModalVisible && modalContent !== null}
  backdropOpacity={0.5}
  onBackdropPress={() => setIsModalVisible(false)}
  animationIn="slideInDown"
  animationOut="slideOutUp"
  style={styles.modal}
>
  <View style={styles.innerModalContainer}>
    {renderModalContent()}
  </View>


</Modal> */}
{/* <Modal
  isVisible={isModalVisible && modalContent !== null}
  backdropOpacity={0.5}
  onBackdropPress={() => setIsModalVisible(false)}
  animationIn="bounceIn"
  animationOut="bounceOut"
  style={styles.modal}
>
  <View style={styles.innerModalContainer}>
    {renderModalContent()}
  </View>
</Modal> */}


<Modal
  isVisible={isModalVisible && modalContent !== null}
  backdropOpacity={0.5}
  onBackdropPress={() => setIsModalVisible(false)}
  animationIn="bounceIn"
  animationOut="bounceOut"
  style={styles.modal}
>
  <View style={styles.innerModalContainer}>
    {renderModalContent()}
  </View>
</Modal>

{/* <Modal
  isVisible={isModalVisible && modalContent !== null}
  backdropOpacity={0.5}
  onBackdropPress={() => setIsModalVisible(false)}
  animationIn="flipInX"
  animationOut="flipOutX"
  style={styles.modal}
>
  <View style={styles.innerModalContainer}>
    {renderModalContent()}
  </View>
</Modal> */}


<Modal
  isVisible={isModalVisible && modalContent !== null}
  backdropOpacity={0.5}
  onBackdropPress={() => setIsModalVisible(false)}
  animationIn="zoomIn"
  animationOut="zoomOut"
  style={styles.modal}
>
  <View style={styles.innerModalContainer}>
    {renderModalContent()}
  </View>
</Modal> 

{/* <Modal
  isVisible={isModalVisible && modalContent !== null}
  backdropOpacity={0.5}
  onBackdropPress={() => setIsModalVisible(false)}
  animationIn="slideInLeft"
  animationOut="slideOutRight"
  style={styles.modal}
>
  <View style={styles.innerModalContainer}>
    {renderModalContent()}
  </View>
</Modal> */}





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
    justifyContent: 'space-between',
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
    width: '80%',
    marginBottom: 20,
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
