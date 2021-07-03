import React from 'react'
import { connect, MapStateToProps } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { MainLayout } from '../../layouts/MainLayout/MainLayout'
import { RootState } from '../../store/types'
import { BaseLayoutProps, BasePageProps } from '../../types/base'
import { checkAccessToken } from '../../utils'
import { Card } from '../Card/Card'

interface State {
  hasError: boolean;
}

interface StateProps {
  isAuth: boolean;
}

interface OwnProps {
  exact?: boolean;
  secured?: boolean;
  onlyPublic?: boolean;
  path: string;
  layout?: React.FC<BaseLayoutProps>;
  component: React.FC<BasePageProps<any>>;
}

type Props = OwnProps & StateProps

class PagePresenter extends React.Component<Props, State> {
  static defaultProps = {
    secured: false,
    onlyPublic: false,
    exact: false
  }

  state: State = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }



  render () {
    const { onlyPublic, isAuth, secured, exact, path, layout: Layout = MainLayout , component: Component } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <Route
          exact={exact}
          path={path}
          render={() => (
            <Layout>
              <Card title={'Ошибка'}>
                <h2>Упс! Что-то поломалось!</h2>
              </Card>
            </Layout>
          )}
        />
      )
    }


    if (onlyPublic && isAuth) {
      return <Redirect to={'/'} />

    }

    if (secured && !isAuth) {
      return <Redirect to={'/auth'} />
    }

    return (
      <Route
        exact={exact}
        path={path}
        render={(props) => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  }
}

const mapStateToProps: MapStateToProps<StateProps, OwnProps, RootState.State> = ({ app }) => ({
  isAuth: checkAccessToken(app.accessToken)
})

export const Page = connect(mapStateToProps)(PagePresenter)
