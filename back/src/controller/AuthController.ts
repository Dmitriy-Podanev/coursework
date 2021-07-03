import * as dayjs from 'dayjs'
import { container } from 'tsyringe'
import { Repository } from '../enum/repository'
import { Service } from '../enum/service'
import { UnauthorizedError } from '../error/UnauthorizedError'
import { schemaAuthLogin, schemaAuthRefresh } from '../schema/auth'
import { App } from '../types/app'
import { Auth } from '../types/auth'
import { Config } from '../types/config'
import { User } from '../types/user'

const configService = container.resolve<Config.Service>(Service.Config)
const authService = container.resolve<Auth.Service>(Service.Auth)
const userRepository = container.resolve<User.Repository>(Repository.User)

export const authLogin: App.Action<Auth.Login.Request> = async (req, res) => {
  await schemaAuthLogin.validate(req.body)
  const user = await userRepository.getFullByLogin(req.body.login)

  if (!user || !(await authService.checkPassword(req.body.password, user.passwordHash))) {
    throw new UnauthorizedError()
  }

  const pair = await authService.getTokenPair(user)
  const refreshTokenExp = dayjs().add(configService.refreshTokenExp, 'second').toDate()
  await userRepository.updateRefreshToken(user.id, pair.refreshToken, refreshTokenExp)

  res.json(pair)
}

export const authRefresh: App.Action<Auth.Refresh.Request> = async (req, res) => {
  await schemaAuthRefresh.validate(req.body)

  const user = await userRepository.getFullByLogin(req.body.login)

  if (await authService.validateRefreshToken(req.body.refreshToken, user)) {
    throw new UnauthorizedError()
  }

  const pair = await authService.getTokenPair(user)
  const refreshTokenExp = dayjs().add(configService.refreshTokenExp, 'second').toDate()
  await userRepository.updateRefreshToken(user.id, pair.refreshToken, refreshTokenExp)

  res.json(pair)
}

export const authLogout: App.Action = async (req, res) => {
  await userRepository.updateRefreshToken(req.user.id, null, null)
  res.json()
}
