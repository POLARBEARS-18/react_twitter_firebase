import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

export interface UserState {
  uid: string
  photoUrl: string | null
  displayName: string | null
}

const initialState: UserState = {
  uid: '',
  photoUrl: '',
  displayName: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: initialState,
  },
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      const targetState = state
      targetState.user = action.payload
    },
    logout: (state) => {
      const targetState = state

      targetState.user = { uid: '', photoUrl: '', displayName: '' }
    },
  },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer
