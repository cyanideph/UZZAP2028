import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { View } from 'react-native'
import { Screen } from '@/components/Screen'
import {
  Avatar,
  Button,
  Card,
  Header,
  IconButton,
  ListItem,
  Section,
  Text,
  ThemeSelector,
} from '@/components/ui'
import { useTheme } from '@/theme'
import { useFollowers, useFollowing } from '@/features/social/hooks'
import { useContentFeed } from '@/features/content/hooks'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
export default function Profile() {
  const { theme } = useTheme()
  const profile = useQuery({
    queryKey: ['me-profile'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not signed in')
      const { data, error } = await supabase
        .from('profiles')
        .select('id,username,display_name,avatar_path,bio,status_text,last_seen_at')
        .eq('id', user.id)
        .maybeSingle()
      if (error) throw error
      return data
    },
    staleTime: 60_000,
  })
  const p = profile.data
  const followers = useFollowers(p?.id ?? '')
  const following = useFollowing(p?.id ?? '')
  const posts = useContentFeed(null, p?.id ?? null)
  return (
    <Screen>
      <Header
        title="Profile"
        right={
          <IconButton variant="soft" onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={21} color={theme.colors.primary} />
          </IconButton>
        }
      />
      <View style={{ gap: 20 }}>
        <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
          <Avatar
            name={p?.display_name ?? p?.username ?? 'You'}
            uri={p?.avatar_path ?? undefined}
            size={88}
            online={!!p?.last_seen_at && Date.now() - new Date(p.last_seen_at).getTime() < 120000}
          />
          <Text variant="title" style={{ marginTop: 12 }}>
            {p?.display_name ?? p?.username ?? 'Your Profile'}
          </Text>
          <Text variant="caption" style={{ marginTop: 3 }}>
            {p?.username ? `@${p.username}` : 'Complete your profile'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              marginTop: 22,
            }}
          >
            <Stat n={String(posts.data?.length ?? 0)} l="Posts" />
            <Stat n={String(followers.data?.length ?? 0)} l="Followers" />
            <Stat n={String(following.data?.length ?? 0)} l="Following" />
          </View>
          <Button
            style={{ width: '100%', marginTop: 20 }}
            disabled={profile.isLoading}
            onPress={() => router.push('/settings')}
          >
            Edit profile
          </Button>
        </Card>
        <Section title="Appearance">
          <ThemeSelector />
        </Section>
        <Section title="Account">
          <ListItem
            title="Notifications"
            subtitle="Manage your alerts"
            onPress={() => router.push('/notifications')}
            left={<Ionicons name="notifications-outline" size={20} color={theme.colors.primary} />}
          />
          <ListItem
            title="Privacy & safety"
            subtitle="Manage blocked accounts"
            left={
              <Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.primary} />
            }
            onPress={() => router.push('/privacy')}
          />
          <ListItem
            title="Help & support"
            subtitle="Get help with Amino"
            left={<Ionicons name="help-circle-outline" size={20} color={theme.colors.primary} />}
          />
        </Section>
      </View>
    </Screen>
  )
}
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text variant="title">{n}</Text>
      <Text variant="caption" style={{ marginTop: 2 }}>
        {l}
      </Text>
    </View>
  )
}
