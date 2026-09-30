import { Badge } from './Badge'
export function RoleBadge({ role }: { role: string }) {
  const tone =
    role === 'owner'
      ? 'primary'
      : role === 'admin'
        ? 'accent'
        : role === 'moderator'
          ? 'success'
          : 'neutral'
  return <Badge tone={tone}>{role}</Badge>
}
