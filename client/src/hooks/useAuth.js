import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import localStorageService from '../utils/localStorageService'
import { setData as setAuthData, checkAuth } from '../redux/authenticationSlice'

const storage = localStorageService

export default function useAuth() {
  const isAuth = useSelector((state) => state.authenticationReducer.isAuth)
  const email = useSelector((state) => state.authenticationReducer.email)
  const token = useSelector((state) => state.authenticationReducer.token)
  const dispatch = useDispatch()

  useEffect(() => {
    const items = storage.getItems(['token', 'email'])
    if (items?.token && items?.email) {
      dispatch(setAuthData(items))
    }
  }, [dispatch])

  useEffect(() => {
    if (token && email) {
      dispatch(checkAuth()).then((res) => {
        if (res?.error) {
          storage.removeItems(['token', 'email'])
        } else {
          storage.setItems([
            ['token', token],
            ['email', email],
          ])
        }
      })
    } else {
      storage.removeItems(['token', 'email'])
    }
  }, [dispatch, token, email])

  return isAuth
}
