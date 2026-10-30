import { useState } from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import type { EventItem } from '@/types/event';

const categories: EventItem['category'][] = ['Навчання', 'Культура', 'Спорт'];
let localSequence = 0;

type EventFormProps = { onAdd: (event: EventItem) => void };

export function EventForm({ onAdd }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<EventItem['category']>('Навчання');
  const [error, setError] = useState('');

  const submit = () => {
    const values = { title: title.trim(), date: date.trim(), place: place.trim(), description: description.trim() };
    if (Object.values(values).some((value) => !value)) {
      setError('Заповніть назву, дату й час, місце та опис події.');
      return;
    }
    // За умовою роботи перевіряємо запис, а не календарну правильність дати.
    if (!/^\d{2}\.\d{2}, \d{2}:\d{2}$/.test(values.date)) {
      setError('Введіть дату й час у форматі дд.мм, гг:хх, наприклад 12.10, 14:00.');
      return;
    }
    onAdd({ id: `local-${Date.now()}-${++localSequence}`, ...values, category });
    setTitle('');
    setDate('');
    setPlace('');
    setDescription('');
    setError('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.form}>
      <Text accessibilityRole="header" style={styles.heading}>Нова подія</Text>
      <Text style={styles.hint}>Маєш ідею для зустрічі? Додай її до подій коледжу.</Text>
      <Text style={styles.label}>Назва події</Text>
      <TextInput accessibilityLabel="Назва події" style={styles.input} value={title} onChangeText={setTitle} placeholder="Наприклад, студентський кіноклуб" placeholderTextColor="#69788e" />
      <Text style={styles.label}>Дата й час</Text>
      <TextInput accessibilityLabel="Дата й час" style={styles.input} value={date} onChangeText={setDate} placeholder="12.10, 14:00" placeholderTextColor="#69788e" autoCapitalize="none" autoCorrect={false} />
      <Text style={styles.label}>Місце</Text>
      <TextInput accessibilityLabel="Місце" style={styles.input} value={place} onChangeText={setPlace} placeholder="Аудиторія 24" placeholderTextColor="#69788e" />
      <Text style={styles.label}>Опис</Text>
      <TextInput accessibilityLabel="Опис" style={[styles.input, styles.description]} value={description} onChangeText={setDescription} placeholder="Що відбудеться та кому буде цікаво?" placeholderTextColor="#69788e" multiline textAlignVertical="top" />
      <Text style={styles.label}>Категорія нової події</Text>
      <View style={styles.categories}>
        {categories.map((item) => (
          <Pressable key={item} accessibilityRole="button" accessibilityLabel={`Категорія нової події: ${item}`} accessibilityState={{ selected: category === item }} onPress={() => setCategory(item)} style={({ pressed }) => [styles.chip, category === item && styles.selected, pressed && styles.pressed]}>
            <Text style={[styles.chipText, category === item && styles.selectedText]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      {!!error && <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
      <Pressable accessibilityRole="button" onPress={submit} style={({ pressed }) => [styles.submit, pressed && styles.pressed]}>
        <Text style={styles.submitText}>Додати подію</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { backgroundColor: '#fff', borderRadius: 18, borderWidth: 1, borderColor: '#dce2ec', padding: 18, gap: 9 },
  heading: { fontSize: 21, lineHeight: 28, fontWeight: '700', color: '#192b48' },
  hint: { fontSize: 13, lineHeight: 20, color: '#53657e', marginBottom: 4 },
  label: { fontSize: 13, fontWeight: '600', color: '#334862', marginTop: 3 },
  input: { minHeight: 46, borderWidth: 1, borderColor: '#bac8dd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, fontSize: 15, color: '#192b48', backgroundColor: '#f8faff' },
  description: { minHeight: 96 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { minHeight: 44, paddingHorizontal: 12, paddingVertical: 11, borderRadius: 10, borderWidth: 1, borderColor: '#bac8dd', justifyContent: 'center' },
  selected: { backgroundColor: '#264ca1', borderColor: '#264ca1' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#465975' },
  selectedText: { color: '#fff' },
  error: { fontSize: 13, lineHeight: 20, color: '#a02430' },
  submit: { minHeight: 48, borderRadius: 10, backgroundColor: '#264ca1', alignItems: 'center', justifyContent: 'center', padding: 12, marginTop: 4 },
  submitText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  pressed: { opacity: 0.7 },
});
