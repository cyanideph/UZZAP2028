# UZZAP2028 Migration Status

## Scope

UZZAP2028 is the destination application. `cyanideph/Aminoappuiclone` is the preserved source/reference and must not be modified or deleted as part of this migration.

## Verified state — 2026-09-30

### Source parity

The Aminoappuiclone repository contains 120 tracked files. All application source files are represented in UZZAP2028 after path normalization, except two source-only metadata files:

- `app.json` — replaced by the destination's `app.config.ts`
- `expo-env.d.ts` — not required by the destination build structure

Therefore the **structural source migration is complete**.

### Destination foundation

UZZAP2028 now contains:

- Expo Router destination routing
- shared UI/component system
- Aurora Violet theme tokens
- feature-first modules
- Supabase client integration
- React Query server state
- Zustand/MMKV client state
- authentication/onboarding flows
- rooms/live chat
- direct/group conversations
- community/content feed
- discovery/social/profile flows
- notifications
- media
- moderation and room controls
- check-ins/leaderboard
- polls/comments/reactions
- E2E/test infrastructure
- Android/iOS native projects

### Backend binding

The destination environment is bound to the Supabase project **BACKEND** (`mauhdrdnlrvjkekxencu`), not UZZAPANDROID_BACKEND.

The live BACKEND project is healthy and currently contains 38 public tables with RLS enabled. Its migration history includes the chat/realtime, social, content, moderation, direct-conversation, security-hardening, poll-result and regression-test work required by the migrated feature surface.

The destination database types currently describe the same 38 public application tables.

## Functional migration status

Structural parity is not the same as feature-complete parity. The remaining work is integration hardening:

1. Verify every migrated screen against its source behavior.
2. Verify every feature hook -> API -> Supabase RPC/table path.
3. Verify realtime subscriptions and authorization.
4. Verify auth/session/bootstrap flows against BACKEND.
5. Verify media/storage paths and attachment contracts.
6. Verify notifications and social events.
7. Verify moderation/co-host/room-control actions.
8. Verify feed/content/poll/comment flows.
9. Run typecheck, lint, unit tests, circular-dependency checks and Maestro smoke/E2E.
10. Run a device-level UX pass and fix regressions before declaring 100%.

## Phase sequence

- Phase 1 — Foundation and source migration: **complete**
- Phase 2 — Shared UI/theme migration: **complete structurally; integration verification remains**
- Phase 3 — Core navigation and feature wiring: **in progress**
- Phase 4 — Supabase/BACKEND integration verification: **in progress**
- Phase 5 — Realtime, media, notifications and moderation hardening: **pending verification**
- Phase 6 — Full automated + device verification: **pending**
- Phase 7 — Final cleanup, performance pass and release readiness: **pending**

## Rule for the remaining migration

Do not rewrite the source repository to make the destination pass checks. Preserve Aminoappuiclone as the reference/backup. Fix the destination implementation and its integration contracts instead.
