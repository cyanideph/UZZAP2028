import { useState } from 'react'
import { View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Screen } from '@/components/Screen'
import {
  BottomSheet,
  Button,
  ConfirmDialog,
  Header,
  LoadingState,
  ModerationActionSheet,
  PermissionState,
  ReportSheetContent,
  Section,
  Text,
} from '@/components/ui'
import {
  useRoomReports,
  useRoomModerationHistory,
  useModerateRoomMessage,
  useUpdateRoomReport,
  useModerateRoomMember,
  useKickRoomMember,
  useStrikeRoomMember,
} from '@/features/rooms/hooks'
import { useTheme } from '@/theme'
export default function Moderation() {
  const { theme } = useTheme()
  const params = useLocalSearchParams<{ roomId?: string }>()
  const roomId = String(params.roomId ?? '')
  const reports = useRoomReports(roomId)
  const history = useRoomModerationHistory(roomId)
  const moderateMessage = useModerateRoomMessage()
  const updateReport = useUpdateRoomReport()
  const moderateMember = useModerateRoomMember()
  const kickMember = useKickRoomMember()
  const strikeMember = useStrikeRoomMember()
  const [selected, setSelected] = useState<any>(null)
  const [confirm, setConfirm] = useState<{
    title: string
    message: string
    action: () => void
  } | null>(null)
  const act = (action: string) => {
    if (action === 'dismiss') {
      setConfirm({
        title: 'Dismiss report',
        message: 'This report will be closed without applying moderation.',
        action: () => {
          if (selected?.id)
            updateReport.mutate({
              reportId: String(selected.id),
              status: 'dismissed',
              resolution: 'dismissed',
            })
          setConfirm(null)
          setSelected(null)
        },
      })
      return
    }
    setConfirm({
      title: action === 'delete' ? 'Remove message' : 'Apply moderation action',
      message: `This will apply “${action}” to the selected report target.`,
      action: () => {
        if (selected?.message_id && action === 'delete')
          moderateMessage.mutate({
            messageId: String(selected.message_id),
            action: 'delete_message',
            reason: 'Staff moderation',
          })
        if (selected?.reported_user_id && action === 'mute')
          moderateMember.mutate({
            roomId,
            targetUserId: String(selected.reported_user_id),
            action: 'mute',
            durationMinutes: 10,
            reason: String(selected.reason ?? 'Reported content'),
          })
        if (selected?.reported_user_id && action === 'ban')
          moderateMember.mutate({
            roomId,
            targetUserId: String(selected.reported_user_id),
            action: 'ban',
            durationMinutes: null,
            reason: String(selected.reason ?? 'Reported content'),
          })
        if (selected?.reported_user_id && action === 'strike')
          strikeMember.mutate({
            roomId,
            targetUserId: String(selected.reported_user_id),
            durationMinutes: 60,
            reason: String(selected.reason ?? 'Reported content'),
          })
        if (selected?.reported_user_id && action === 'kick')
          kickMember.mutate({
            roomId,
            targetUserId: String(selected.reported_user_id),
            allowRejoin: true,
            reason: String(selected.reason ?? 'Reported content'),
          })
        if (
          selected?.id &&
          (action === 'delete' ||
            action === 'mute' ||
            action === 'ban' ||
            action === 'strike' ||
            action === 'kick')
        )
          updateReport.mutate({
            reportId: String(selected.id),
            status: 'resolved',
            resolution: action,
          })
        setConfirm(null)
        setSelected(null)
      },
    })
  }
  return (
    <Screen>
      <Header title="Moderation" subtitle="Authorized community staff" />
      <View style={{ gap: 18 }}>
        <Section title="Reports">
          {reports.isLoading ? (
            <LoadingState />
          ) : reports.error ? (
            <Text variant="caption" style={{ color: theme.colors.danger }}>
              Unable to load reports.
            </Text>
          ) : Array.isArray(reports.data) && reports.data.length ? (
            reports.data.map((report: any) => (
              <Button
                key={String(report.id)}
                variant="secondary"
                onPress={() => {
                  setSelected(report)
                  if (report?.id)
                    updateReport.mutate({
                      reportId: String(report.id),
                      status: 'reviewing',
                      resolution: null,
                    })
                }}
              >
                Report {String(report.id).slice(0, 8)}
              </Button>
            ))
          ) : (
            <PermissionState
              title="No open reports"
              message="There are no currently open reports for this room."
            />
          )}
        </Section>
        <Section title="Moderation history">
          {history.isLoading ? (
            <LoadingState />
          ) : Array.isArray(history.data) && history.data.length ? (
            history.data.slice(0, 10).map((item: any) => (
              <Text key={String(item.id)} variant="caption" style={{ paddingVertical: 4 }}>
                {String(item.action ?? 'action')} •{' '}
                {item.created_at ? new Date(item.created_at).toLocaleString() : 'recent'}
              </Text>
            ))
          ) : (
            <Text variant="caption">No moderation actions recorded yet.</Text>
          )}
        </Section>
        <Section title="Staff tools">
          <PermissionState
            title="Review and act"
            message="Select a report to inspect the available moderation action."
            action="Review reports"
            onPress={() => reports.refetch()}
          />
        </Section>
      </View>
      <BottomSheet visible={!!selected} onClose={() => setSelected(null)}>
        <Text variant="title">Report review</Text>
        <Text variant="caption" style={{ marginTop: 6 }}>
          Reason: {selected?.reason ?? '—'}
          {selected?.created_at ? ` • ${new Date(selected.created_at).toLocaleString()}` : ''}
        </Text>
        <Text variant="caption" style={{ marginTop: 4, marginBottom: 12 }}>
          Reporter: {selected?.reporter_id ? String(selected.reporter_id).slice(0, 8) : '—'} •
          Target: {selected?.reported_user_id ? String(selected.reported_user_id).slice(0, 8) : '—'}
        </Text>
        <Text variant="caption" style={{ marginTop: 4, marginBottom: 12 }}>
          Use only for content or members that require action.
        </Text>
        <ModerationActionSheet onAction={act} />
        <View style={{ marginTop: 12 }}>
          <Text variant="caption">Report reason</Text>
          <ReportSheetContent
            onSelect={(reason) =>
              setConfirm({
                title: 'Confirm report action',
                message: reason,
                action: () => {
                  setConfirm(null)
                  setSelected(null)
                },
              })
            }
          />
        </View>
      </BottomSheet>
      <ConfirmDialog
        visible={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={confirm?.action ?? (() => {})}
        title={confirm?.title ?? 'Confirm'}
        message={confirm?.message}
        confirmLabel="Apply"
        danger
      />
    </Screen>
  )
}
