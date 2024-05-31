import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const Levels = ({ navigation }) => {
  const data = [
    { key: '1', image: require('../assets/L-1.png'), text: 'Palace' },
    { key: '2', image: require('../assets/L-2.png'), text: 'House' },
    { key: '3', image: require('../assets/MLL.png'), text: 'Haunted' },
    { key: '4', image: require('../assets/MLL.png'), text: 'Carnival' },
    { key: '5', image: require('../assets/MLL.png'), text: 'Cricket' },
    { key: '6', image: require('../assets/MLL.png'), text: 'Punk Rock' },
    { key: '7', image: require('../assets/MLL.png'), text: 'Haunted' },
    { key: '8', image: require('../assets/MLL.png'), text: 'Punk Rock' },
    { key: '9', image: require('../assets/MLL.png'), text: 'Level 9' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      if (item.key === '1') {
        navigation.navigate('Ep1');
      }
    }}>
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Levels</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={3}
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
    textShadowColor: 'red',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 10,
    paddingTop: 30
  },
  flatlistContent: {
    alignItems: 'center',
  },
  itemContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  image: {
    width: 125,
    height: 200,
    borderRadius: 10,
  },
});

export default Levels;
