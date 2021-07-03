import block from 'bem-cn'
import React, { useCallback, useMemo } from 'react'
import { browserHistory } from '../../browserHistory'
import { Button } from '../../components/Button/Button'
import { ButtonType } from '../../components/Button/ButtonType'
import { Card } from '../../components/Card/Card'
import { Spinner } from '../../components/Spinner/Spinner'
import { useLanguageById } from '../../hooks/useLanguageById'
import { BasePageProps } from '../../types/base'
import './LanguagePage.css'

interface Props extends BasePageProps<{ id: string }> {
}

const b = block('language-page')

export const LanguagePage: React.FC<Props> = ({ match }) => {
  const id = useMemo<number>(() => +match.params.id, [match])
  const { data, loading } = useLanguageById(id)

  const button = useCallback(() => data ? (
    <Button
      type={ButtonType.Secondary}
      onClick={() => browserHistory.push(`/ref/languages/${data.id}/edit`)}
    >
      Редактировать
    </Button>
  ) : null, [data])

  return (
    <Card
      title={data ? `${data?.name} язык` : ''}
      rightElement={button}
    >
      {loading ? (
        <Spinner size={32} />
      ) : (
        <pre>
          {JSON.stringify(data)}
        </pre>
      )}
    </Card>
  )
}
