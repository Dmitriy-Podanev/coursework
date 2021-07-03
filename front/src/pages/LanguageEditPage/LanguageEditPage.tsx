import block from 'bem-cn'
import React, { useMemo } from 'react'
import { Card } from '../../components/Card/Card'
import { LanguageForm } from '../../components/Forms/LanguageForm/LanguageForm'
import { Spinner } from '../../components/Spinner/Spinner'
import { useLanguageById } from '../../hooks/useLanguageById'
import { BasePageProps } from '../../types/base'
import './LanguageEditPage.css'

interface Props extends BasePageProps<{ id?: string }> {
}

const b = block('language-edit-page')

export const LanguageEditPage: React.FC<Props> = ({ match }) => {
  const id = useMemo<number | undefined>(() => match.params?.id ? +match.params?.id : undefined, [match])
  const { data, loading } = useLanguageById(id)

  return (
    <Card title={!!data ? 'Редактировать' : 'Создать'}>
      {loading ? (
        <Spinner size={32} />
      ) : (
        <LanguageForm data={data} />
      )}
    </Card>
  )
}
