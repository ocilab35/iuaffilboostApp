import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.100.57:5000/api/auth/unapproved-users')
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleApprove = (userId) => {
    axios.patch(`http://192.168.100.57:5000/api/auth/approve/${userId}`)
      .then(() => {
        alert('User approved');
        // After approval, refresh the list or handle UI updates
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      })
      .catch(err => alert('Error approving user'));
  };
  
  const handleReject = (userId) => {
    axios.patch(`http://192.168.100.57:5000/api/auth/reject/${userId}`)
      .then(() => {
        alert('User rejected');
        // After rejection, refresh the list or handle UI updates
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      })
      .catch(err => alert('Error rejecting user'));
  };
  
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text>{item.username} - {item.email}</Text>
            <Button title="Approve" onPress={() => handleApprove(item._id)} />
            <Button title="Reject" onPress={() => handleReject(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  userCard: { padding: 10, marginVertical: 5, backgroundColor: '#f8f8f8' },
});

export default AdminHome;
