import { container } from 'tsyringe'
import { Repository } from '../enum/repository'
import { Service } from '../enum/service'
import { UnauthorizedError } from '../error/UnauthorizedError'
import { App } from '../types/app'
import { Auth } from '../types/auth'
import { User } from '../types/user'
import { handlerError } from '../utils'

const authService = container.resolve<Auth.Service>(Service.Auth)
const userRepository = container.resolve<User.Repository>(Repository.User)

export const authMiddleware: App.Action = async (req, res, next) => {
  const error = new UnauthorizedError()

  const token: string = (req.header('Authorization') || '').replace(/^Bearer\s/, '')
  if (token === '') {
    handlerError(error, req, res)
    return
  }

  const payload = await authService.validateToken(token)
  if (!payload) {
    handlerError(error, req, res)
    return
  }

  const user = await userRepository.getFullByLogin(payload.login)
  if (!user.refreshToken) {
    handlerError(error, req, res)
    return
  }

  req.user = user

  next()
}
