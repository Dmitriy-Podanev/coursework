import block from 'bem-cn'
import { useFormik } from 'formik'
import React, { MouseEventHandler, useState } from 'react'
import * as Yup from 'yup'
import { apiLanguageCreate, apiLanguageUpdate } from '../../../api/language'
import { browserHistory } from '../../../browserHistory'
import { BaseComponentProps } from '../../../types/base'
import { Language } from '../../../types/language'
import { Button } from '../../Button/Button'
import { ButtonType } from '../../Button/ButtonType'
import { Input } from '../../Input/Input'
import './LanguageForm.css'

interface Props extends BaseComponentProps {
  data: Language.Data | null;
}

const b = block('language-form')

const schema: Yup.SchemaOf<Language.Create.Params> = Yup.object().shape(({
  name: Yup.string().required('Обязательное')
}))

export const LanguageForm: React.FC<Props> = ({ className = '', data }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const { errors, values, submitForm, handleChange } = useFormik<Language.Create.Params>({
    initialValues: {
      name: data?.name ?? ''
    },
    validationSchema: schema,
    onSubmit: async (fields) => {
      try {
        let id: number
        setLoading(true)
        if (data) {
          id = data.id
          await apiLanguageUpdate({ ...data, ...fields })
        } else {
          const res = await apiLanguageCreate(fields)
          id = res.id
        }
        browserHistory.push(`/ref/languages/${id}`)
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
      <Input
        className={b('field')}
        label={'Язык'}
        name={'name'}
        value={values.name}
        onChange={handleChange}
        error={errors?.name}
        disabled={loading}
      />
      {!errorText && (
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
          {!!data ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </form>
  )
}
