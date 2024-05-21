import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

import { colors } from '..'

const MainSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',
  background: colors.green50,
  height: 'calc(100vh - 48px)'
}))

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  minHeight: 'inherit',
  height: '100%'
})

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <MainSection>
      <StyledPaper variant='section'>{children}</StyledPaper>
    </MainSection>
  )
}
