import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EventCard } from '@/components/EventCard';
import { initialEvents } from '@/data/events';

export default function IndexScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>БФКПЕП · СТУДЕНТСЬКЕ ЖИТТЯ</Text>
        <Text style={styles.title} accessibilityRole="header">Події коледжу</Text>
        <Text style={styles.subtitle}>Зустрічайся, навчайся та долучайся.</Text>
        <Text style={styles.count}>{initialEvents.length} події · Навчальні приклади</Text>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.list}>
        {initialEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        <Text style={styles.footer}>Це всі події. До зустрічі в коледжі!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2f5fa' },
  header: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 18, gap: 8, width: '100%', maxWidth: 640, alignSelf: 'center' },
  eyebrow: { fontSize: 10, letterSpacing: 1.1, fontWeight: '700', color: '#486495' },
  title: { fontSize: 32, lineHeight: 40, fontWeight: '800', color: '#192b48' },
  subtitle: { fontSize: 15, lineHeight: 22, color: '#53657e' },
  count: { fontSize: 12, color: '#53657e', marginTop: 4 },
  scroll: { flex: 1 },
  list: { paddingHorizontal: 18, paddingTop: 2, paddingBottom: 28, gap: 14, width: '100%', maxWidth: 640, alignSelf: 'center' },
  footer: { fontSize: 12, lineHeight: 20, textAlign: 'center', color: '#53657e', paddingVertical: 10 },
});
