import FormKit from './FormKit'
import { Legend } from './FormKit/styled-components'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/authenticationSlice'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const { FormMeta, Form, TextField, SubmitButton } = FormKit

const StyledLink = styled(Link)`
  margin-left: auto;
  text-decoration: none;
  color: inherit;
`

const LoginForm = () => {
  const dispatch = useDispatch()

  return (
    <FormMeta
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(8, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(login(values)).finally(() => setSubmitting(false))
      }}
    >
      <Form>
        <StyledLink to="registration">I have no account</StyledLink>
        <Legend>Login</Legend>
        <TextField label="Email" name="email" />
        <TextField label="Password" name="password" type="password" />
        <SubmitButton text="Login" />
      </Form>
    </FormMeta>
  )
}

export default LoginForm
