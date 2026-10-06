import { useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

export default function IndexScreen() {
  // Створюємо змінну стану, яка запам'ятовує, чи натиснули кнопку
  const [showEvent, setShowEvent] = useState(false);

  const handlePress = () => {
    Alert.alert('Оновлення бази', 'Завантажуємо свіжі дані...');
    setShowEvent(true); // Змінюємо стан, щоб показати приховану подію
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Події БФКПЕП</Text>
      <Text style={styles.description}>Головні новини та анонси нашого коледжу.</Text>

      {/* Умова: якщо showEvent === true, показуємо подію, інакше — підказку */}
      {showEvent ? (
        <View style={styles.eventCard}>
          <Text style={styles.eventTitle}>Сьогодні: Турнір з настільного тенісу</Text>
          <Text style={styles.eventDetails}>Збираємо усіх у спортивній залі</Text>
        </View>
      ) : (
        <Text style={styles.hint}>Список подій з'явиться нижче</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title={showEvent ? "Перевірити ще раз" : "Отримати нові події"}
          onPress={handlePress}
          color="#0066cc"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  hint: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#555',
  }
});