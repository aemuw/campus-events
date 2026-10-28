import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EventCard } from '@/components/EventCard';
import { initialEvents } from '@/data/events';
import type { EventItem } from '@/types/event';

type CategoryFilter = EventItem['category'] | 'Усі';
const categories: CategoryFilter[] = ['Усі', 'Навчання', 'Культура', 'Спорт'];

export default function IndexScreen() {

  const [category, setCategory] = useState<CategoryFilter>('Усі');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [filterNotice, setFilterNotice] = useState('');
  const previousCategory = useRef(category);

  const visibleEvents = useMemo(() => {
    return category === 'Усі'
      ? initialEvents
      : initialEvents.filter((event) => event.category === category);
  }, [category]);

  useEffect(() => {
    if (previousCategory.current === category) return;

    previousCategory.current = category;
    // Навчальна демонстрація useEffect за методичкою: повідомлення і таймер.
    setFilterNotice(`Фільтр: ${category}`);
    const timer = setTimeout(() => setFilterNotice(''), 2000);

    return () => clearTimeout(timer);
  }, [category]);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>БФКПЕП · СТУДЕНТСЬКЕ ЖИТТЯ</Text>
        <Text style={styles.title} accessibilityRole="header">Події коледжу</Text>
        <Text style={styles.subtitle}>Зустрічайся, навчайся та долучайся.</Text>
        <View style={styles.filters}>
          {categories.map((item) => (
            <Pressable
              key={item}
              accessibilityRole="button"
              accessibilityLabel={item}
              accessibilityState={{ selected: category === item }}
              onPress={() => setCategory(item)}
              style={({ pressed }) => [
                styles.filter,
                category === item && styles.activeFilter,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.filterText, category === item && styles.activeFilterText]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.summary}>
          <Text style={styles.count}>Показано: {visibleEvents.length} із {initialEvents.length}</Text>
          <Text style={styles.favoriteCount}>Обрано: {favoriteIds.length}</Text>
        </View>
        <View style={styles.noticeSlot}>
          <Text style={styles.notice} accessibilityLiveRegion="polite">{filterNotice}</Text>
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.list}>
        {visibleEvents.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>У цій категорії поки немає подій</Text>
            <Text style={styles.emptyHint}>Виберіть іншу категорію або поверніться до всіх подій.</Text>
          </View>
        ) : (
          visibleEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isFavorite={favoriteIds.includes(event.id)}
              onToggleFavorite={() => toggleFavorite(event.id)}
            />
          ))
        )}
        {visibleEvents.length > 0 && (
          <Text style={styles.footer}>Це всі події. До зустрічі в коледжі!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2f5fa' },
  header: { paddingHorizontal: 22, paddingTop: 20, paddingBottom: 6, gap: 8, width: '100%', maxWidth: 640, alignSelf: 'center' },
  eyebrow: { fontSize: 10, letterSpacing: 1.1, fontWeight: '700', color: '#486495' },
  title: { fontSize: 32, lineHeight: 40, fontWeight: '800', color: '#192b48' },
  subtitle: { fontSize: 15, lineHeight: 22, color: '#53657e' },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  filter: { minHeight: 42, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#d3ddea', backgroundColor: '#ffffff', justifyContent: 'center' },
  activeFilter: { backgroundColor: '#264ca1', borderColor: '#264ca1' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#465975' },
  activeFilterText: { color: '#ffffff' },
  pressed: { opacity: 0.7 },
  summary: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 4 },
  count: { fontSize: 12, color: '#53657e' },
  favoriteCount: { fontSize: 13, fontWeight: '700', color: '#264ca1' },
  noticeSlot: { minHeight: 24, justifyContent: 'center' },
  notice: { fontSize: 12, lineHeight: 18, color: '#264ca1' },
  scroll: { flex: 1 },
  list: { paddingHorizontal: 18, paddingTop: 2, paddingBottom: 28, gap: 14, width: '100%', maxWidth: 640, alignSelf: 'center' },
  empty: { padding: 22, gap: 10, backgroundColor: '#ffffff', borderRadius: 18, borderWidth: 1, borderColor: '#dce2ec' },
  emptyTitle: { fontSize: 18, lineHeight: 25, fontWeight: '700', color: '#192b48' },
  emptyHint: { fontSize: 14, lineHeight: 22, color: '#53657e' },
  footer: { fontSize: 12, lineHeight: 20, textAlign: 'center', color: '#53657e', paddingVertical: 10 },
});
