/* Avatar circular com iniciais */

interface AvatarProps {
  nome?: string
  iniciais: string
  cor?: string
  size?: 'xs' | 'sm' | 'lg'
}

export function Avatar({ nome, iniciais, cor, size }: AvatarProps) {
  const cls = 'av' + (size ? ' ' + size : '')
  return (
    <div className={cls} style={{ background: cor || 'var(--accent)' }} title={nome}>
      {iniciais}
    </div>
  )
}
