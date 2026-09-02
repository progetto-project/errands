# Errands

App mobile per organizzare le commissioni quotidiane in base a posizione, tempo e percorsi.

Stack: Expo + React Native + TypeScript + Expo Router · Supabase (Postgres, Auth, Edge Functions) · Google Maps Platform + Google Routes API · OpenAI (server-side) · PostHog.

## Setup locale

```bash
npm install
cp .env.example .env
# compila .env con i tuoi valori (vedi sezione "Account/API necessari" sotto)
npx expo start
```

Requisiti: Node.js LTS, Expo CLI (`npx expo`), Xcode (per iOS) e/o Android Studio (per Android), un progetto Supabase, un progetto Google Cloud con Maps SDK + Places API + Routes API abilitate.

## Account/API necessari

1. Supabase — URL + anon key (in `.env`), service role key (solo secret server-side)
2. Google Maps Platform — Maps SDK iOS/Android, Places API, Geocoding API
3. Google Routes API — stesso progetto GCP, billing attivo
4. OpenAI — secret key, impostata come secret di Supabase Edge Functions (mai in `.env` del client)
5. PostHog — project key + host
6. Apple Developer Program (per build/publish iOS)
7. Google Play Console (per build/publish Android)
8. Account Expo/EAS (per build e submit)

## Schema database

La migrazione iniziale è in `supabase/migrations/0001_init.sql` (tabelle `profiles`, `places`, `errands`, `suggestions`, `routes`, tutte con Row Level Security attiva). Verrà applicata concretamente in Fase 7.

## Struttura del progetto

Vedi la cartella `app/` per le route (Expo Router, file-based), `features/` per la logica di dominio isolata per area (auth, errands, routes, suggestions, location, profile), `components/ui` per i componenti di design system riutilizzabili, `lib/supabase` per il client dati, `supabase/functions` per la logica server-side (parsing AI, routing).

## Stato del progetto

Scaffold iniziale (Fase 2). Nessuna schermata funzionale è ancora implementata: il design system definitivo (Fase 3), la navigazione reale (Fase 4) e le funzionalità (Fasi 5+) seguiranno in ordine, una alla volta, con conferma dopo ogni fase.
