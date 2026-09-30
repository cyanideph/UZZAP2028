import { colors } from './colors'

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
} as const

export const typography = {
  xs: { fontSize: 11, lineHeight: 16 },
  sm: { fontSize: 13, lineHeight: 18 },
  md: { fontSize: 15, lineHeight: 21 },
  lg: { fontSize: 17, lineHeight: 24 },
  xl: { fontSize: 20, lineHeight: 27 },
  xxl: { fontSize: 24, lineHeight: 31 },
  display: { fontSize: 32, lineHeight: 39 },
} as const

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
} as const

export const sizes = {
  iconXs: 16,
  iconSm: 20,
  iconMd: 24,
  iconLg: 32,
  avatarSm: 32,
  avatarMd: 44,
  avatarLg: 64,
  avatarXl: 88,
  minTouch: 44,
} as const

export const motion = {
  fast: 140,
  normal: 220,
  slow: 320,
} as const

const shared = { spacing, radius, typography, fontWeights, sizes, motion }

export const lightTheme = {
  mode: 'light' as const,
  colors: {
    background: colors.neutral[50],
    surface: colors.neutral[0],
    surfaceElevated: colors.neutral[0],
    surfaceMuted: '#F1F0F8',
    text: colors.neutral[900],
    textSecondary: colors.neutral[600],
    textMuted: colors.neutral[500],
    border: colors.neutral[200],
    borderStrong: colors.neutral[300],
    primary: colors.violet[600],
    primaryPressed: colors.violet[700],
    primarySoft: colors.violet[100],
    secondary: colors.indigo[600],
    accent: colors.cyan[400],
    accentSoft: '#E6FAFD',
    social: colors.pink[500],
    success: colors.emerald[500],
    warning: colors.amber[500],
    danger: colors.rose[500],
    onPrimary: colors.neutral[0],
    onPrimaryMuted: '#EDE9FE',
    onDanger: colors.neutral[0],
    onAccent: colors.neutral[950],
    overlay: 'rgba(11,10,18,0.45)',
    tabBar: colors.neutral[0],
    tabBarInactive: colors.neutral[500],
    online: colors.emerald[500],
    readonly: colors.amber[500],
    locked: colors.rose[500],
    admin: colors.violet[600],
    scrim: 'rgba(11,10,18,0.45)',
  },
  ...shared,
}

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    background: colors.neutral[950],
    surface: '#13121D',
    surfaceElevated: '#1A1826',
    surfaceMuted: '#211F2D',
    text: '#F8F7FF',
    textSecondary: '#B5B2C5',
    textMuted: '#7F7B91',
    border: '#292638',
    borderStrong: '#3A354B',
    primary: colors.violet[500],
    primaryPressed: colors.violet[400],
    primarySoft: '#211A42',
    secondary: colors.indigo[500],
    accent: colors.cyan[400],
    accentSoft: '#102F36',
    social: colors.pink[400],
    success: colors.emerald[400],
    warning: colors.amber[400],
    danger: colors.rose[400],
    onPrimary: colors.neutral[0],
    onPrimaryMuted: '#EDE9FE',
    onDanger: colors.neutral[0],
    onAccent: colors.neutral[950],
    overlay: 'rgba(0,0,0,0.65)',
    tabBar: '#13121D',
    tabBarInactive: '#7F7B91',
    online: colors.emerald[400],
    readonly: colors.amber[400],
    locked: colors.rose[400],
    admin: colors.violet[400],
    scrim: 'rgba(0,0,0,0.65)',
  },
  ...shared,
}

export type AppTheme = typeof lightTheme
