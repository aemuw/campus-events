import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useEventForm } from '@/hooks/use-event-form';
import { EventForm } from '@/components/EventForm';
import { EventCard } from '@/components/EventCard';
import { additionalEvents, initialEvents } from '@/data/events';
import type { EventItem } from '@/types/event';

type CategoryFilter = EventItem['category'] | 'Усі';
const categories: CategoryFilter[] = ['Усі', 'Навчання', 'Культура', 'Спорт'];

export default function IndexScreen() {

  const eventForm = useEventForm();
  const { width } = useWindowDimensions();
  const columns = width >= 700 ? 2 : 1;
  const [refreshing, setRefreshing] = useState(false);
  const [refreshNotice, setRefreshNotice] = useState('');
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [category, setCategory] = useState<CategoryFilter>('Усі');
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [filterNotice, setFilterNotice] = useState('');
  const previousCategory = useRef(category);

  const visibleEvents = useMemo(() => {
    return category === 'Усі'
      ? events
      : events.filter((event) => event.category === category);
  }, [events, category]);

  useEffect(() => {
    if (previousCategory.current === category) return;

    previousCategory.current = category;
    // Навчальна демонстрація useEffect за методичкою: повідомлення і таймер.
    setFilterNotice(`Фільтр: ${category}`);
    const timer = setTimeout(() => setFilterNotice(''), 2000);

    return () => clearTimeout(timer);
  }, [category]);

  useEffect(() => () => {
    if (refreshTimer.current !== null) clearTimeout(refreshTimer.current);
  }, []);

  const refreshEvents = () => {
    if (refreshTimer.current !== null) return;
    setRefreshing(true);
    setRefreshNotice('');
    refreshTimer.current = setTimeout(() => {
      setEvents((previous) => {
        const existingIds = new Set(previous.map((event) => event.id));
        return [...previous, ...additionalEvents.filter((event) => !existingIds.has(event.id))];
      });
      setRefreshing(false);
      setRefreshNotice('Список оновлено. Повторні події не додаються.');
      refreshTimer.current = null;
    }, 800);
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((previous) => previous.includes(id)
      ? previous.filter((itemId) => itemId !== id)
      : [...previous, id]);
  };

  const listHeader = (
    <View style={styles.listHeader}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>БФКПЕП · СТУДЕНТСЬКЕ ЖИТТЯ</Text>
        <Text style={styles.title} accessibilityRole="header">Події коледжу</Text>
        <Text style={styles.subtitle}>Зустрічайся, навчайся та долучайся.</Text>
        <Image source={require('../../assets/images/college-events.jpg')} accessible accessibilityLabel="БФКПЕП — Бердичівський фаховий коледж промисловості, економіки та права" style={styles.banner} resizeMode="contain" />
      </View>
      <EventForm form={eventForm} onAdd={(event) => setEvents((previous) => [event, ...previous])} />
      <View style={styles.header}>
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
          <Text style={styles.count}>Показано: {visibleEvents.length} із {events.length}</Text>
          <Text style={styles.favoriteCount}>Обрано: {favoriteIds.length}</Text>
        </View>
        <View style={styles.noticeSlot}>
          <Text style={styles.notice} accessibilityLiveRegion="polite">{filterNotice}</Text>
        </View>
      </View>
      <Pressable accessibilityRole="button" accessibilityState={{ disabled: refreshing }} disabled={refreshing} onPress={refreshEvents} style={({ pressed }) => [styles.refreshButton, pressed && styles.pressed, refreshing && styles.pressed]}>
        <Text style={styles.filterText}>{refreshing ? 'Оновлення…' : 'Оновити події'}</Text>
      </Pressable>
      {!!refreshNotice && <Text accessibilityLiveRegion="polite" style={styles.notice}>{refreshNotice}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          key={columns}
          numColumns={columns}
          data={visibleEvents}
          keyExtractor={(event) => event.id}
          extraData={favoriteIds}
          renderItem={({ item }) => (
            <View style={styles.cardSlot}>
              <EventCard event={item} isFavorite={favoriteIds.includes(item.id)} onToggleFavorite={() => toggleFavorite(item.id)} />
            </View>
          )}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>У цій категорії поки немає подій</Text>
              <Text style={styles.emptyHint}>Виберіть іншу категорію або поверніться до всіх подій.</Text>
            </View>
          }
          ListFooterComponent={visibleEvents.length > 0 ? <Text style={styles.footer}>Це всі події. До зустрічі в коледжі!</Text> : null}
          contentContainerStyle={styles.list}
          columnWrapperStyle={columns === 2 ? styles.columns : undefined}
          keyboardShouldPersistTaps="handled"
          refreshing={refreshing}
          onRefresh={refreshEvents}
          alwaysBounceVertical
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f2f5fa' },
  header: { paddingHorizontal: 4, paddingTop: 8, paddingBottom: 6, gap: 8, width: '100%', maxWidth: 640, alignSelf: 'center' },
  banner: { width: '100%', height: 150, backgroundColor: '#082b62', borderRadius: 14, marginTop: 8 },
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
  listHeader: { gap: 14, marginBottom: 14 },
  columns: { gap: 14 },
  cardSlot: { flex: 1, marginBottom: 14 },
  refreshButton: { minHeight: 44, borderRadius: 10, borderWidth: 1, borderColor: '#bfcce3', backgroundColor: '#edf2fc', alignItems: 'center', justifyContent: 'center', padding: 12 },
  list: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 28, width: '100%', maxWidth: 1100, alignSelf: 'center' },
  empty: { padding: 22, gap: 10, backgroundColor: '#ffffff', borderRadius: 18, borderWidth: 1, borderColor: '#dce2ec' },
  emptyTitle: { fontSize: 18, lineHeight: 25, fontWeight: '700', color: '#192b48' },
  emptyHint: { fontSize: 14, lineHeight: 22, color: '#53657e' },
  footer: { fontSize: 12, lineHeight: 20, textAlign: 'center', color: '#53657e', paddingVertical: 10 },
});
