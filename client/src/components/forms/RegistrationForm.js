import FormKit from './FormKit'
import { Legend } from './FormKit/styled-components'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { registration } from '../../redux/authenticationSlice'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

const { FormMeta, Form, TextField, SubmitButton } = FormKit

const StyledLink = styled(Link)`
  margin-left: auto;
  text-decoration: none;
  color: inherit;
`

const RegistrationForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

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
        dispatch(registration(values))
          .finally(() => setSubmitting(false))
          .then((res) => {
            if (!res?.error) {
              history.push('login')
            }
          })
      }}
    >
      <Form>
        <StyledLink to="login">I have account</StyledLink>
        <Legend>Registration</Legend>
        <TextField label="Email" name="email" />
        <TextField label="Password" name="password" type="password" />
        <SubmitButton text="Registration" />
      </Form>
    </FormMeta>
  )
}

export default RegistrationForm
