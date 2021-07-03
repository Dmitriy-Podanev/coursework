import { container } from 'tsyringe'
import { Repository } from '../enum/repository'
import { NotFoundError } from '../error/NotFoundError'
import { schemaAuthorCreate, schemaAuthorUpdate, schemaAuthorValidId } from '../schema/author'
import { schemaBookList } from '../schema/book'
import { App } from '../types/app'
import { Author } from '../types/author'

const authorRepository = container.resolve<Author.Repository>(Repository.Author)

export const authorGetAll: App.Action<Author.List.Request> = async (req, res) => {
  await schemaBookList.validate(req.query)
  const { search = '' } = req.query

  const authors = search ? await authorRepository.search(search): await authorRepository.getAll()


  res.json(authors)
}

export const authorCreate: App.Action<Author.Create.Request> = async (req, res) => {
  await schemaAuthorCreate.validate(req.body)

  const author = await authorRepository.create(req.body)

  res.status(201).json(author)
}

export const authorUpdate: App.Action<Author.Update.Request> = async (req, res) => {
  await schemaAuthorUpdate.validate(req.body)

  const authorSrc = await authorRepository.getByIdWithRelations(req.body.id)

  if (!authorSrc) {
    throw new NotFoundError()
  }

  const author = await authorRepository.update(authorSrc.id, req.body)

  res.json(author)
}

export const authorDelete: App.Action<Author.Delete.Request> = async (req, res) => {
  await schemaAuthorValidId.validate(req.params)

  const author = await authorRepository.getByIdWithRelations(req.params.id)

  if (!author) {
    throw new NotFoundError()
  }

  await authorRepository.delete(author.id)

  res.status(204).json()
}
