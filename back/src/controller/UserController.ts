import { container } from 'tsyringe'
import { DeepPartial } from 'typeorm'
import { UserEntity } from '../entity/UserEntity'
import { Repository } from '../enum/repository'
import { Service } from '../enum/service'
import { schemaUserCreate } from '../schema/user'
import { App } from '../types/app'
import { Auth } from '../types/auth'
import { User } from '../types/user'

const userRepository = container.resolve<User.Repository>(Repository.User)
const authService = container.resolve<Auth.Service>(Service.Auth)

export const userCreate: App.Action<User.Create.Request> = async (req, res) => {
  await schemaUserCreate.validate(req.body, { abortEarly: false })

  const data: DeepPartial<UserEntity> = {
    login: req.body.login,
    email: req.body.email,
    passwordHash: await authService.getPasswordHash(req.body.password)
  }

  const createdUser = await userRepository.create(data)
  const user = await userRepository.getById(createdUser.id)

  res.status(201).json(user)
}
