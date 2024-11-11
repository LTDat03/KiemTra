import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: '1', name: 'Pinarello', price: 1800, type: 'Mountain', image: require('../assets/bifour_-removebg-preview.png') },
  { id: '2', name: 'Pina Mountai', price: 1700, type: 'Mountain', image: require('../assets/bione-removebg-preview-1.png') },
  { id: '3', name: 'Pina Bike', price: 1500, type: 'Roadbike', image: require('../assets/bione-removebg-preview.png') },
  { id: '4', name: 'Pinarello', price: 1900, type: 'Roadbike', image: require('../assets/bithree_removebg-preview-1.png') },
  { id: '5', name: 'Pinarello', price: 2700, type: 'Mountain', image: require('../assets/bithree_removebg-preview.png') },
  { id: '6', name: 'Pinarello', price: 1350, type: 'Mountain', image: require('../assets/bitwo-removebg-preview.png') },
  ];

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addBike: (state, action) => {
      state.push(action.payload)
    },
    
    setBikeFromApi: (state, action) => {
      return action.payload;
    }
  },
});

export const { addBike, setBikeFromApi} = filterSlice.actions;
export default filterSlice.reducer;