import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addBike} from '../redux/filterSlice';

export default function App() {
  const bikes = useSelector((state) => state.bikes);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const filteredBikes = filter === 'All' ? bikes : bikes.filter(bike => bike.type === filter);
  
  const renderBike = ({item}) => (
  <View style={styles.bikeCard}>
      <Image source={item.image} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{item.name}</Text>
      <Text style={styles.bikePrice}>${item.price}</Text>
    </View>
  );

  const handleAddBike = () => {
    const newBike = {
      id: (bikes.length + 1).toString(),
      name: 'new bike',
      price: 2200,
      type: 'Mountain', 
      image: require('../assets/bione-removebg-preview.png'),
    };

    dispatch(addBike(newBike));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The world's Best Bike</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, filter === 'All' && styles.activeButton]} onPress={() => setFilter('All')}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'Roadbike' && styles.activeButton]} onPress={() => setFilter('Roadbike')}>
          <Text style={styles.filterText}>Roadbike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'Mountain' && styles.activeButton]} onPress={() => setFilter('Mountain')}>
          <Text style={styles.filterText}>Mountain</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredBikes}
        renderItem={renderBike}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.bikeList}
      />

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddBike}>
          <Text style={styles.textAdd}>ADD</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E94E4F',
    textAlign: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#FFE6E6',
    borderColor: '#E94E4F',
  },
  filterText: {
    fontSize: 16,
    color: '#E94E4F',
  },
  bikeList: {
    justifyContent: 'center',
  },
  bikeCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  bikeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  bikeName: {
    fontSize: 16,
    marginVertical: 5,
  },
  bikePrice: {
    fontSize: 18,
    color: '#E94E4F',
    fontWeight: 'bold',
  },
   addButtonContainer: {
    alignItems: 'center', 
    marginTop: 20,
  },
  buttonAdd:{
    backgroundColor:'#00BDD6',
    padding:10,
    borderRadius:10,
    width:'50%',
    alignItems:'center',
    justifyContent:'center'
  },
  textAdd:{
    color:'#fff',
    fontSize:16,
  }
});


