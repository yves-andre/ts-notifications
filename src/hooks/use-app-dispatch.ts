import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../store'

// https://redux.js.org/tutorials/typescript-quick-start
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch