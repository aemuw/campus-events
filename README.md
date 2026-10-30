# Campus Events

Навчальний застосунок «Події коледжу» на React Native, TypeScript та Expo SDK 57.

## Запуск

```powershell
npm ci
npx expo start
```

Для Android потрібна Expo Go, сумісна з SDK 57. Установлені залежності node_modules займають приблизно 514 МБ — вони потрібні для запуску, але не зберігаються в Git. Після очищення залежності відновлюються командою npm ci.

## Перевірки

```powershell
npx tsc --noEmit
npx expo lint
```

## Структура

- src/app — екрани та маршрути Expo Router.
- src/components — компоненти інтерфейсу, зокрема EventCard.
- src/data/events.ts — навчальні приклади подій.
- src/types/event.ts — тип EventItem.


