import { useState } from 'react';
import type { EventItem } from '@/types/event';

// Стан форми живе вище списку, який перемонтовується при зміні колонок.
export function useEventForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<EventItem['category']>('Навчання');
  const [error, setError] = useState('');

  return { title, setTitle, date, setDate, place, setPlace, description, setDescription, category, setCategory, error, setError };
}
