import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, css, ThemeProvider } from '@mui/material/styles'
import { FC, useState } from 'react'
import { auth, provider } from 'lib/firebase/firebase'

import { Email } from '@mui/icons-material'

const defaultTheme = createTheme()

const Auth: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password)
  }

  const signUpEmail = async () => {
    await auth.createUserWithEmailAndPassword(email, password)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    })
  }

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err: { message: string }) => alert(err.message))
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? 'Login' : 'Register'}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<Email />}
                onClick={
                  isLogin
                    ? async () => {
                        try {
                          await signInEmail()
                        } catch (err) {
                          if (err instanceof Error) {
                            alert(err.message)
                          }
                        }
                      }
                    : async () => {
                        try {
                          await signUpEmail()
                        } catch (err) {
                          if (err instanceof Error) {
                            alert(err.message)
                          }
                        }
                      }
                }
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <span css={SLoginReset}>Forgot password?</span>
                </Grid>
                <Grid item xs>
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    css={[SToggleModeButton, SLoginToggleMode]}
                  >
                    <span> {isLogin ? 'Create new account' : 'Back to login'}</span>
                  </button>
                </Grid>
              </Grid>

              <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={signInGoogle}>
                Sign In with Google
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Auth

const SLoginToggleMode = css`
  cursor: pointer;
  color: #0000ff;
`

const SLoginModal = css`
  text-align: center;
`

const SLoginReset = css`
  cursor: pointer;
`
const LoginHiddenIcon = css`
  text-align: center;
  display: none;
`

const SLonginAddItem = css`
  cursor: pointer;
  color: gray;
`

const SLoginAddIconLoaded = css`
  cursor: pointer;
  color: whitesmoke;
`

const SToggleModeButton = css`
  border: none;
  outline: none;
  background: transparent;
`
