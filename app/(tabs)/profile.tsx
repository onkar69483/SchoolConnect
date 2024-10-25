import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themedText';
import { useThemeColor } from '@/hooks/useThemeColor';


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    phoneNumber: '(123) 456-7890',
    email: 'johndoe@example.com',
    age: '25',
    address: '123 Main St, Anytown, USA'
  });

  const backgroundColor = useThemeColor({ light: '#f0f2f5', dark: '#1e1e1e' }, 'background');
  const borderColor = useThemeColor({ light: '#ddd', dark: '#444' }, 'border');
  const textColor = useThemeColor({ light: '#333', dark: '#ccc' }, 'text');
  const buttonColor = useThemeColor({ light: '#007bff', dark: '#0056b3' }, 'button');
  const cardBackground = useThemeColor({ light: '#fff', dark: '#2c2c2c' }, 'background');

  const handleSave = () => {
    // Implement save functionality here
    setIsEditing(false);
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      {/* Profile Header Section */}
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/images/profile.png')}
          style={styles.avatar}
        />
        <ThemedText type="title" style={[styles.name, { color: textColor }]}>John Doe</ThemedText>
        <ThemedText type="subtitle" style={[styles.role, { color: textColor }]}>Student</ThemedText>
      </View>

      {/* Profile Information Section */}
      <View style={[styles.infoSection, { backgroundColor: cardBackground }]}>
        {isEditing ? (
          <>
            <View style={styles.infoItem}>
              <ThemedText style={[styles.infoLabel, { color: textColor }]}>Phone Number:</ThemedText>
              <TextInput
                style={[styles.infoInput, { borderColor }]}
                value={profile.phoneNumber}
                onChangeText={(text) => setProfile({ ...profile, phoneNumber: text })}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={[styles.infoLabel, { color: textColor }]}>Email:</ThemedText>
              <TextInput
                style={[styles.infoInput, { borderColor }]}
                value={profile.email}
                onChangeText={(text) => setProfile({ ...profile, email: text })}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={[styles.infoLabel, { color: textColor }]}>Age:</ThemedText>
              <TextInput
                style={[styles.infoInput, { borderColor }]}
                value={profile.age}
                onChangeText={(text) => setProfile({ ...profile, age: text })}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={[styles.infoLabel, { color: textColor }]}>Address:</ThemedText>
              <TextInput
                style={[styles.infoInput, { borderColor }]}
                value={profile.address}
                onChangeText={(text) => setProfile({ ...profile, address: text })}
              />
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={handleSave}>
              <ThemedText type="title" style={styles.buttonText}>Save Changes</ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.infoItem}>
              <ThemedText style={[styles.infoLabel, { color: textColor }]}>Phone Number:</ThemedText>
              <ThemedText style={[styles.infoText, { color: textColor }]}> {profile.phoneNumber} </ThemedText>
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={[styles.infoLabel, { color: textColor }]}>Email:</ThemedText>
              <ThemedText style={[styles.infoText, { color: textColor }]}> {profile.email} </ThemedText>
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={[styles.infoLabel, { color: textColor }]}>Age:</ThemedText>
              <ThemedText style={[styles.infoText, { color: textColor }]}> {profile.age} </ThemedText>
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={[styles.infoLabel, { color: textColor }]}>Address:</ThemedText>
              <ThemedText style={[styles.infoText, { color: textColor }]}> {profile.address} </ThemedText>
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={() => setIsEditing(true)}>
              <ThemedText type="title" style={styles.buttonText}>Edit Profile</ThemedText>
            </TouchableOpacity>
          </>
        )}
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  role: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  infoSection: {
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 14,
  },
  infoInput: {
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Profile;