type Recordable<T = any> = Record<string, T>
type ThemeColorKey =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'

type ThemeColorValue = 'DEFAULT' | '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'

type ThemeColor = Record<ThemeColorKey, Record<ThemeColorValue, string>>
