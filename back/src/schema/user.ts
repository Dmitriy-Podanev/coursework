import { container } from 'tsyringe'
import * as Yup from 'yup'
import { Repository } from '../enum/repository'
import { User } from '../types/user'

const userRepository = container.resolve<User.Repository>(Repository.User)

const uniqueLogin = async login => !(await userRepository.hasExistLogin(login))

const uniqueEmail = async email => !(await userRepository.hasExistEmail(email))

const matchPassword = (value, context) => value === context.parent.password

export const schemaUserCreate: Yup.SchemaOf<User.Create.Body> = Yup.object().shape({
  login: Yup.string().required().test('unique', 'login must be unique', uniqueLogin),
  email: Yup.string().email().required().test('unique', 'email must be unique', uniqueEmail),
  password: Yup.string().required(),
  passwordConfirm: Yup.string().test('match', matchPassword)
})
