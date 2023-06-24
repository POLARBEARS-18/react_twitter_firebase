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
import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { auth, provider, storage } from 'lib/firebase/firebase'

import { AccountCircle, Camera, Email, Send } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from 'features/userSlice'
import { IconButton, Modal } from '@mui/material'

const defaultTheme = createTheme()

const getModalStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const Auth: FC = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [isLogin, setIsLogin] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [resetEmail, setResetEmail] = useState('')

  const sendResetEmail = async (e: MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false)
        setResetEmail('')
      })
      .catch((err) => {
        if (err instanceof Error) {
          alert(err.message)
          setResetEmail('')
        }
      })
  }

  const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0])
      const targetEvent = e
      targetEvent.target.value = ''
    }
  }

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password)
  }

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password)
    let url = ''
    if (avatarImage) {
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')
      const fileName = `${randomChar}_${avatarImage.name}`

      await storage.ref(`avatars/${fileName}`).put(avatarImage)
      url = (await storage.ref('avatars').child(fileName).getDownloadURL()) as string
    }

    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    })

    dispatch(updateUserProfile({ displayName: username, photoUrl: url }))
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {!isLogin && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    label="Username"
                    id="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                  />
                  <Box textAlign="center">
                    <IconButton>
                      <label htmlFor="inputFile">
                        <AccountCircle fontSize="large" css={avatarImage ? SLoginAddIconLoaded : SLoginAddIcon} />
                        <input type="file" onChange={onChangeImageHandler} css={SLoginHiddenIcon} id="inputFile" />
                      </label>
                    </IconButton>
                  </Box>
                </>
              )}
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
                disabled={
                  isLogin ? !email || password.length < 6 : !username || !email || password.length < 6 || !avatarImage
                }
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <button type="button" onClick={() => setOpenModal(true)} css={[SToggleModeButton]}>
                    <span css={SLoginReset}>Forgot password?</span>
                  </button>
                </Grid>
                <Grid item>
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    css={[SToggleModeButton, SLoginToggleMode]}
                  >
                    <span> {isLogin ? 'Create new account' : 'Back to login'}</span>
                  </button>
                </Grid>
              </Grid>

              <Button
                type="button"
                startIcon={<Camera />}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signInGoogle}
              >
                Sign In with Google
              </Button>
            </Box>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <div style={getModalStyle()} css={SModal}>
                <div css={SLoginModal}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Reset E-mail"
                    type="email"
                    id="password"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value)
                    }}
                  />
                  <IconButton onClick={sendResetEmail}>
                    <Send />
                  </IconButton>
                </div>
              </div>
            </Modal>
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
const SLoginHiddenIcon = css`
  text-align: center;
  display: none;
`

const SLoginAddIcon = css`
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

const SModal = css`
  outline: none;
  position: absolute;
  width: 400px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 5px;
  padding: 10px;
`
