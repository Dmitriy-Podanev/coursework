import { RouteComponentProps } from 'react-router'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../store/types'

export interface BaseComponentProps {
  className?: string;
}

export interface BasePageProps<T extends object = {}> extends RouteComponentProps<T> {
}

export interface BaseLayoutProps {
}

export type Thunk<T = void> = (params: T) => ThunkAction<Promise<void> | void, RootState.State, {}, any> | void
