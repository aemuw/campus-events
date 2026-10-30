import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { EventItem } from '@/types/event';

type EventCardProps = {
  event: EventItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const categoryColors = {
  Навчання: { backgroundColor: '#e8efff', color: '#264ca1' },
  Культура: { backgroundColor: '#f4eafb', color: '#743393' },
  Спорт: { backgroundColor: '#e5f4ed', color: '#25654b' },
};

export function EventCard({ event, isFavorite, onToggleFavorite }: EventCardProps) {
  const categoryColor = categoryColors[event.category];
  const favoriteAction = isFavorite ? 'Прибрати з обраного' : 'В обране';

  return (
    <View style={[styles.card, isFavorite && styles.favoriteCard]}>
      <View style={styles.topRow}>
        <Text style={[styles.category, categoryColor]}>{event.category}</Text>
        <Text style={styles.date}>{event.date}</Text>
      </View>
      <Text style={styles.title} accessibilityRole="header">{event.title}</Text>
      <Text style={styles.place}>Місце: {event.place}</Text>
      <Text style={styles.description}>{event.description}</Text>
      {isFavorite && <Text style={styles.favoriteStatus}>В обраному</Text>}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}: ${event.title}`}
        accessibilityState={{ selected: isFavorite }}
        onPress={onToggleFavorite}
        style={({ pressed }) => [
          styles.favoriteButton,
          isFavorite && styles.selectedButton,
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.buttonText, isFavorite && styles.selectedButtonText]}>
          {favoriteAction}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#dce2ec', borderRadius: 18, padding: 18, gap: 10 },
  favoriteCard: { borderColor: '#7e9ad4' },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  category: { fontSize: 12, fontWeight: '700', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  date: { fontSize: 13, fontWeight: '600', color: '#4f5f78' },
  title: { fontSize: 20, lineHeight: 26, fontWeight: '700', color: '#192b48' },
  place: { fontSize: 14, lineHeight: 21, fontWeight: '600', color: '#465975' },
  description: { fontSize: 15, lineHeight: 23, color: '#48566b' },
  favoriteStatus: { fontSize: 12, fontWeight: '700', color: '#264ca1' },
  favoriteButton: { minHeight: 44, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11, borderWidth: 1, borderColor: '#bfcce3', backgroundColor: '#edf2fc', alignItems: 'center', justifyContent: 'center', marginTop: 3 },
  selectedButton: { borderColor: '#264ca1', backgroundColor: '#264ca1' },
  buttonText: { fontSize: 14, lineHeight: 20, fontWeight: '600', color: '#264ca1' },
  selectedButtonText: { color: '#ffffff' },
  pressed: { opacity: 0.7 },
});
