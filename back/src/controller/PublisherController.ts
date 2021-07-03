import { container } from 'tsyringe'
import { Repository } from '../enum/repository'
import { NotFoundError } from '../error/NotFoundError'
import {
  schemaPublisherCreate,
  schemaPublisherList,
  schemaPublisherUpdate,
  schemaPublisherValidId
} from '../schema/publisher'
import { App } from '../types/app'
import { Publisher } from '../types/publisher'

const publisherRepository = container.resolve<Publisher.Repository>(Repository.Publisher)

export const publisherGetAll: App.Action<Publisher.List.Request> = async (req, res) => {
  await schemaPublisherList.validate(req.query)
  const { search = '' } = req.query

  const publishers = search ? await publisherRepository.search(search): await publisherRepository.getAll()

  res.json(publishers)
}

export const publisherCreate: App.Action<Publisher.Create.Request> = async (req, res) => {
  await schemaPublisherCreate.validate(req.body)

  const publisher = await publisherRepository.create(req.body)

  res.status(201).json(publisher)
}

export const publisherUpdate: App.Action<Publisher.Update.Request> = async (req, res) => {
  await schemaPublisherUpdate.validate(req.body)

  const publisherSrc = await publisherRepository.getById(req.body.id)

  if (!publisherSrc) {
    throw new NotFoundError()
  }

  const publisher = await publisherRepository.update(publisherSrc.id, req.body)

  res.json(publisher)
}

export const publisherDelete: App.Action<Publisher.Delete.Request> = async (req, res) => {
  await schemaPublisherValidId.validate(req.params)

  const publisher = await publisherRepository.getById(req.params.id)

  if (!publisher) {
    throw new NotFoundError()
  }

  await publisherRepository.delete(publisher)

  res.status(204).json()
}
