
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Levels = ({ navigation }) => {
  const data = [
    { key: '1', image: require('../assets/L-1.png'), text: 'Palace', description: 'A magnificent palace with grand architecture.' },
    { key: '2', image: require('../assets/L-2.png'), text: 'House', description: 'A cozy house with a beautiful garden.' },
    { key: '3', image: require('../assets/MLL.png'), text: 'Haunted', description: 'A spooky haunted house with eerie vibes.' },
    { key: '4', image: require('../assets/MLL.png'), text: 'Carnival', description: 'A lively carnival with fun rides and games.' },
    { key: '5', image: require('../assets/MLL.png'), text: 'Cricket', description: 'A cricket stadium buzzing with excitement.' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.touchable}
      onPress={() => {
        if (item.key === '1') {
          navigation.navigate('Ep1');
        }
      }}
    >
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
      <Text style={styles.header}>Levels</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={1}
        contentContainerStyle={styles.flatlistContent}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Michroma-Regular',
    textShadowColor: 'tomato',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  flatlistContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  touchable: {
    width: width * 0.9,
    marginVertical: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  itemContainer: {
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 15,
    padding: 15,
    overflow: 'hidden',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#e0e0e0',
    fontWeight: '600',
    marginTop: 10,
    fontFamily: 'Michroma-Regular',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#a0a0a0',
    marginTop: 10,
    fontFamily: 'Michroma-Regular',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default Levels;
