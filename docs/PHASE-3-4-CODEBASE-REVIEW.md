# Phase 3/4 Migration Review — 2026-09-30

## Findings

1. **Duplicate Supabase client configuration exists.**
   - `src/lib/supabase.ts` uses `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and AsyncStorage.
   - `src/config/supabase.ts` uses the obsolete `EXPO_PUBLIC_SUPABASE_ANON_KEY` contract and contains an unrelated legacy `profiles`/tasks Database type.
   - Feature APIs import `@/lib/supabase`, while the legacy auth context imports `@/config/supabase`.
   - This creates two client/configuration contracts and is a migration blocker.

2. **Root providers do not mount the legacy AuthProvider.**
   - `src/app/_layout.tsx` mounts SafeAreaProvider, QueryClientProvider and the destination ThemeProvider only.
   - `AuthProvider` exists separately under `src/context/auth-context.tsx`.
   - This means the legacy auth context is not part of the active root tree.

3. **There are duplicate routing systems.**
   - The active-looking `src/app/(tabs)` contains the migrated UZZAP tabs.
   - `src/app/(protected)/(tabs)` still contains the original template tabs: Home, Tasks, AI Chat, Profile, Settings.
   - Both are present and must be reconciled so navigation does not retain template behavior.

4. **`src/app/(tabs)/explore.tsx` is still template/demo content.**
   - It contains the Expo starter Explore/parallax/tutorial screen.
   - This is a clear incomplete migration screen and should be replaced or removed from the UZZAP navigation surface.

5. **Generated database typing is stale/incomplete for the active backend.**
   - The BACKEND database contains RPCs `get_content_poll_results` and `list_content_comments`.
   - UZZAP2028 feature APIs call both RPCs.
   - `src/types/database.types.ts` does not currently describe either function.
   - This breaks the source-of-truth relationship between the live backend and client typings.

6. **Realtime implementation is too broad for production hardening.**
   - Room/conversation/notification subscriptions are implemented, but the hooks invalidate entire queries after inserts rather than merging/normalizing events.
   - This is functionally acceptable as a first integration layer but should be optimized after correctness tests.

7. **BACKEND security advisor currently reports one actionable warning.**
   - Leaked-password protection is disabled.
   - Performance advisor reports 70 unused indexes. These are not automatically removable; they need workload evidence before cleanup.

## Next implementation gates

- Consolidate the Supabase client contract.
- Remove the stale template navigation surface from the active application.
- Replace the remaining Expo starter Explore screen.
- Regenerate/synchronize database types with BACKEND.
- Add integration tests for the feature RPC matrix.
- Then proceed to realtime/media/notification/moderation E2E verification.
