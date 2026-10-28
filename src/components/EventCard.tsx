import { StyleSheet, Text, View } from 'react-native';

import type { EventItem } from '@/types/event';

type EventCardProps = {
  event: EventItem;
};

const categoryColors = {
  Навчання: { backgroundColor: '#e8efff', color: '#264ca1' },
  Культура: { backgroundColor: '#f4eafb', color: '#743393' },
  Спорт: { backgroundColor: '#e5f4ed', color: '#25654b' },
};

export function EventCard({ event }: EventCardProps) {
  const categoryColor = categoryColors[event.category];

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={[styles.category, categoryColor]}>{event.category}</Text>
        <Text style={styles.date}>{event.date}</Text>
      </View>
      <Text style={styles.title} accessibilityRole="header">{event.title}</Text>
      <Text style={styles.place}>Місце: {event.place}</Text>
      <Text style={styles.description}>{event.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dce2ec',
    borderRadius: 18,
    padding: 18,
    gap: 10,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  category: { fontSize: 12, fontWeight: '700', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  date: { fontSize: 13, fontWeight: '600', color: '#4f5f78' },
  title: { fontSize: 20, lineHeight: 26, fontWeight: '700', color: '#192b48' },
  place: { fontSize: 14, lineHeight: 21, fontWeight: '600', color: '#465975' },
  description: { fontSize: 15, lineHeight: 23, color: '#48566b' },
});
