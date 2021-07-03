import * as Yup from 'yup'
import { Auth } from '../types/auth'

export const schemaAuthLogin: Yup.SchemaOf<Auth.Login.Body> = Yup.object().shape({
  login: Yup.string().required(),
  password: Yup.string().required()
})

export const schemaAuthRefresh: Yup.SchemaOf<Auth.Refresh.Body> = Yup.object().shape({
  login: Yup.string().required(),
  refreshToken: Yup.string().required()
})
