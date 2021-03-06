import { memo } from 'react'
import { ICWrapper, TIcon } from './wrapper'

export const ICPlus = memo(({ className, onClick }: TIcon) => {
  return (
    <ICWrapper onClick={onClick} className={className}>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </ICWrapper>
  )
})
