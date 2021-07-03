import block from 'bem-cn'
import { useFormik } from 'formik'
import React, { MouseEventHandler, useState } from 'react'
import * as Yup from 'yup'
import { apiUserCreate } from '../../../api/user'
import { browserHistory } from '../../../browserHistory'
import { BaseComponentProps } from '../../../types/base'
import { User } from '../../../types/user'
import { Button } from '../../Button/Button'
import { ButtonType } from '../../Button/ButtonType'
import { Input } from '../../Input/Input'
import { InputType } from '../../Input/InputType'
import './RegistrationForm.css'

interface Props extends BaseComponentProps {
}

const b = block('registration-form')

const schema: Yup.SchemaOf<User.Create.Params> = Yup.object().shape(({
  login: Yup.string().required('Обязательное'),
  email: Yup.string().email('Невалидный email').required('Обязательное'),
  password: Yup.string().required('Обязательное'),
  passwordConfirm: Yup.string().required('Обязательное')
    .test('match', 'Пароли не совпадают', (value, context) => value === context.parent.password)
}))

export const RegistrationForm: React.FC<Props> = ({ className = '' }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const { errors, values, submitForm, handleChange } = useFormik<User.Create.Params>({
    initialValues: {
      login: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema: schema,
    onSubmit: async (fields) => {
      try {
        setLoading(true)
        await apiUserCreate(fields)
        browserHistory.push('/auth')
      } catch (err) {
        setErrorText(err.message)
      } finally {
        setLoading(false)
      }
    }
  })

  const handlerSubmit: MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault()
    submitForm().catch()
  }



  return (
    <form className={b({}).mix(className)}>
      <h2 className={b('title')}>Регистрация</h2>
      <Input
        className={b('field')}
        label={'Имя'}
        name={'login'}
        value={values.login}
        onChange={handleChange}
        error={errors?.login}
        disabled={loading}
      />
      <Input
        className={b('field')}
        label={'Email'}
        name={'email'}
        value={values.email}
        onChange={handleChange}
        error={errors?.email}
        disabled={loading}
      />
      <Input
        className={b('field')}
        label={'Пароль'}
        name={'password'}
        htmlType={InputType.Password}
        value={values.password}
        onChange={handleChange}
        error={errors?.password}
        disabled={loading}
      />
      <Input
        className={b('field')}
        label={'Подтверждение пароля'}
        name={'passwordConfirm'}
        htmlType={InputType.Password}
        value={values.passwordConfirm}
        onChange={handleChange}
        error={errors?.passwordConfirm}
        disabled={loading}
      />
      {!!errorText && (
        <p className={b('error')}>
          {errorText}
        </p>
      )}
      <div className={b('buttons')}>
        <Button
          onClick={handlerSubmit}
          loading={loading}
          type={ButtonType.Primary}
        >
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}
