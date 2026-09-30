import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'
import { router } from 'expo-router'
import { Screen } from '@/components/Screen'
import { Header, ListItem, Section, ThemeSelector, LoadingState, Text } from '@/components/ui'
import { useTheme } from '@/theme'
import {
  useNotificationPreferences,
  useSetNotificationPreferences,
} from '@/features/notifications/hooks'
export default function Settings() {
  const { theme } = useTheme()
  const prefs = useNotificationPreferences()
  const save = useSetNotificationPreferences()
  const p = prefs.data
  const toggle = (key: keyof NonNullable<typeof p>) => {
    if (!p || save.isPending) return
    save.mutate({ ...p, [key]: !p[key] })
  }
  const iconColor = (key: string) =>
    key === 'content_reaction_enabled' || key === 'comment_reply_enabled'
      ? theme.colors.social
      : key === 'mention_enabled'
        ? theme.colors.accent
        : theme.colors.primary
  return (
    <Screen>
      <Header title="Settings" subtitle="Appearance, notifications and safety" />
      <View style={{ gap: 20 }}>
        <Section title="Appearance">
          <ThemeSelector />
        </Section>
        <Section title="Notifications">
          {prefs.isLoading ? (
            <LoadingState />
          ) : prefs.error ? (
            <Text variant="caption" style={{ color: theme.colors.danger }}>
              Notification settings unavailable. Please try again.
            </Text>
          ) : p ? (
            <View style={{ gap: 4 }}>
              {(
                [
                  [
                    'Follows',
                    'follow_enabled',
                    'person-add-outline',
                    'Activity from people you follow',
                  ],
                  [
                    'Comments',
                    'content_comment_enabled',
                    'chatbubble-ellipses-outline',
                    'New comments on your content',
                  ],
                  [
                    'Comment replies',
                    'comment_reply_enabled',
                    'return-down-forward-outline',
                    'Replies to your comments',
                  ],
                  [
                    'Reactions',
                    'content_reaction_enabled',
                    'heart-outline',
                    'Likes and room message reactions',
                  ],
                  ['Mentions', 'mention_enabled', 'at-outline', 'When someone mentions you'],
                  ['Room invites', 'room_invite_enabled', 'people-outline', 'Room invitations'],
                  [
                    'Conversation invites',
                    'conversation_invite_enabled',
                    'mail-outline',
                    'Direct and group invitations',
                  ],
                ] as const
              ).map(([title, key, icon, desc]) => (
                <ListItem
                  key={key}
                  title={title}
                  subtitle={p[key] ? desc : 'Notifications disabled'}
                  left={<Ionicons name={icon as any} size={20} color={iconColor(key)} />}
                  right={
                    <Text
                      variant="caption"
                      color={p[key] ? theme.colors.success : theme.colors.textMuted}
                    >
                      {p[key] ? 'On' : 'Off'}
                    </Text>
                  }
                  onPress={() => toggle(key)}
                />
              ))}
            </View>
          ) : null}
        </Section>
        <Section title="Privacy & safety">
          <ListItem
            title="Blocking and visibility"
            subtitle="Manage blocked accounts"
            left={
              <Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.primary} />
            }
            onPress={() => router.push('/privacy')}
          />
        </Section>
        <Section title="Language & support">
          <ListItem
            title="Language"
            subtitle="Language preferences are coming soon"
            left={<Ionicons name="language-outline" size={20} color={theme.colors.textMuted} />}
          />
          <ListItem
            title="Help center"
            subtitle="Help and support tools are coming soon"
            left={<Ionicons name="help-circle-outline" size={20} color={theme.colors.textMuted} />}
          />
        </Section>
      </View>
    </Screen>
  )
}
