import { Formik, Form, useField, useFormikContext } from 'formik'
import * as Styled from './styled-components'

const TextField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <Styled.FieldWrapper>
      <Styled.Label htmlFor={props.id || props.name}>{label}</Styled.Label>
      <Styled.TextInput {...field} {...props} type={type ?? 'text'} />
      {meta.touched && meta.error ? (
        <Styled.Error>{meta.error}</Styled.Error>
      ) : null}
    </Styled.FieldWrapper>
  )
}

const SubmitButton = ({ text, ...props }) => {
  const { isSubmitting, isValid } = useFormikContext()
  return (
    <Styled.Button type="submit" disabled={isSubmitting || !isValid}>
      {text}
    </Styled.Button>
  )
}

const FormKit = {
  TextField,
  FormMeta: Formik,
  Form: Styled.Form,
  Legend: Styled.Legend,
  SubmitButton,
}

export default FormKit
