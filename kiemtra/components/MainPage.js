import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Modal, TextInput, Button, Picker} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addBike, setBikeFromApi} from '../redux/filterSlice';
import axios from 'axios';

export default function App() {
  const bikes = useSelector((state) => state.bikes);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [newBike, setNewBike] = useState({
    name: '',
    price: '',
    type: 'Roadbike',
    image: '',
  })
  const filteredBikes = filter === 'All' ? bikes : bikes.filter(bike => bike.type === filter);
  
  useEffect(() => {
    const fetchBikeFromApi = async () => {
      try{
        const response = await axios.get('https://6731a3ae7aaf2a9aff1152c3.mockapi.io/bikes');
        dispatch(setBikeFromApi(response.data));
      }catch(error){
        console.log("Error fetching bikes: ", error);
      }
    };

    fetchBikeFromApi();
  },[dispatch]);

  const renderBike = ({item}) => (
  <View style={styles.bikeCard}>
      <Image source={{uri: item.image}} style={styles.bikeImage} />
      <Text style={styles.bikeName}>{item.name}</Text>
      <Text style={styles.bikePrice}>${item.price}</Text>
    </View>
  );

  const handleAddBike = async () => {
    const bikeData = {
      ...newBike,
      price: parseFloat(newBike.price),
    };

    try{
      const response = await axios.post('https://6731a3ae7aaf2a9aff1152c3.mockapi.io/bikes', newBike);
      dispatch(addBike(response.data));
      setModalVisible(false);
      setNewBike({ name: '', price: '', type: '', image: '' });
    }catch(error){
      console.log("Error adding new bike: ", error);
    }

   
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
        <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
          <Text style={styles.textAdd}>ADD</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Bike</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newBike.name}
              onChangeText={(text) => setNewBike({ ...newBike, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={newBike.price}
              keyboardType="numeric"
              onChangeText={(text) => setNewBike({ ...newBike, price: text })}
            />
            <Picker
              selectedValue={newBike.type}
              style={styles.picker}
              onValueChange={(itemValue) => setNewBike({ ...newBike, type: itemValue })}
            >
              <Picker.Item label="Roadbike" value="Roadbike" />
              <Picker.Item label="Mountain" value="Mountain" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={newBike.image}
              onChangeText={(text) => setNewBike({ ...newBike, image: text })}
            />
            <Button title="Add Bike" onPress={handleAddBike} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 15,
    padding: 5,
    fontSize: 16,
  },
  picker: {
    width: '100%',
    height: 50,
    marginVertical: 15,
  },
});


