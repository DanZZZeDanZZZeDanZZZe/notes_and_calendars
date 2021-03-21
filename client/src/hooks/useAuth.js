import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LocalStorageService from '../utils/LocalStorageService'
import { setData as setAuthData, checkAuth } from '../redux/authenticationSlice'

const storage = new LocalStorageService()

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
      dispatch(checkAuth())
        .then(() =>
          storage.setItems([
            ['token', token],
            ['email', email],
          ])
        )
        .catch(() => storage.deleteItems(['token', 'email']))
    }
  }, [dispatch, token, email])

  return isAuth
}
