# UZZAP2028 Migration Status

## Scope

UZZAP2028 is the destination application. `cyanideph/Aminoappuiclone` remains the preserved source/reference and must not be modified or deleted as part of this migration.

## Verified state — 2026-09-30

### Structural migration

- Source application structure has been migrated into UZZAP2028.
- Destination uses `src/app` as the Expo Router root.
- The duplicate starter `src/app/(protected)` route tree has been removed.
- The duplicate Expo starter `src/app/(tabs)/explore.tsx` has been removed.
- The legacy duplicate `src/config/supabase.ts` client has been removed.
- The canonical Supabase client is `src/lib/supabase.ts`, using the BACKEND project environment and the existing MMKV auth storage adapter.
- Auth is mounted at the application root and the integrated tabs route now guards authentication/onboarding.

### Backend binding

The destination is bound to the Supabase project **BACKEND** (`mauhdrdnlrvjkekxencu`), not UZZAPANDROID_BACKEND.

The live BACKEND project currently exposes the migrated room/chat, social, content, notification and moderation RPC surface. Verified directly today:

- `get_content_poll_results(uuid) -> jsonb`
- `list_content_comments(uuid,timestamptz,uuid,integer) -> jsonb`
- `list_conversation_messages(uuid,timestamptz,uuid,integer) -> jsonb`
- `list_room_messages(uuid,timestamptz,uuid,integer) -> jsonb`
- `list_notifications(timestamptz,uuid,integer) -> jsonb`
- `list_public_rooms(integer,integer) -> setof rooms`

The missing content RPC declarations were added to `src/types/database.types.ts`.

### Integration fixes completed in this pass

1. Consolidated runtime Supabase access onto `src/lib/supabase.ts`.
2. Updated the auth context and remaining profile API import to the canonical client.
3. Standardized the application deep-link scheme to `uzzap2028://`.
4. Updated navigation constants/helpers from the removed starter protected tree to the integrated UZZAP routes.
5. Added the root `AuthProvider`.
6. Added authentication + onboarding guards to the integrated tab navigator.
7. Removed the competing starter route tree and starter Explore screen.
8. Updated the local environment example to the publishable-key naming.
9. Synced the two previously missing content RPC type declarations.

## Phase status

- Phase 1 — Foundation and source migration: **complete**
- Phase 2 — Shared UI/theme migration: **complete structurally; device verification remains**
- Phase 3 — Core navigation and feature wiring: **active; duplicate route tree removed and auth/onboarding gate wired**
- Phase 4 — Supabase/BACKEND integration verification: **active**
- Phase 5 — Realtime, media, notifications and moderation hardening: **next**
- Phase 6 — Full automated + device verification: **pending**
- Phase 7 — Final cleanup, performance pass and release readiness: **pending**

## Important verification state

GitHub Actions is configured to run lint, typecheck and unit tests on every push to `main`. The latest push-triggered run is still pending, so the repository is **not yet declared build-clean**. Earlier rapid commits caused intermediate runs to be cancelled; wait for the latest run before treating CI as authoritative.

## Rule for the remaining migration

Do not rewrite `Aminoappuiclone` to make destination checks pass. Preserve it as the reference/backup. Fix UZZAP2028 implementation and its integration contracts instead.
