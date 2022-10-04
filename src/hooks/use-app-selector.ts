import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../store'

// https://redux.js.org/tutorials/typescript-quick-start
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector