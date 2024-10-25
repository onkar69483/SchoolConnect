import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/authSlice';
import { Button, View, Text, StyleSheet } from 'react-native';

function Explore() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    // You can also add navigation to redirect after logout if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Explore;
