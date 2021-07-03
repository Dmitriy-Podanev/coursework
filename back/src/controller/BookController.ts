import { pickBy, identity } from 'lodash'
import { container } from 'tsyringe'
import { DeepPartial } from 'typeorm'
import { BookEntity } from '../entity/BookEntity'
import { Repository } from '../enum/repository'
import { NotFoundError } from '../error/NotFoundError'
import { schemaBookCreate, schemaBookList, schemaBookValidateId, schemaBookUpdate } from '../schema/book'
import { schemaLanguageValidId } from '../schema/language'
import { App } from '../types/app'
import { Author } from '../types/author'
import { Book } from '../types/book'
import { File } from '../types/file'
import { Genre } from '../types/genre'
import { Language } from '../types/language'
import { Publisher } from '../types/publisher'

const bookRepository = container.resolve<Book.Repository>(Repository.Book)
const fileRepository = container.resolve<File.Repository>(Repository.File)
const genreRepository = container.resolve<Genre.Repository>(Repository.Genre)
const authorRepository = container.resolve<Author.Repository>(Repository.Author)
const languageRepository = container.resolve<Language.Repository>(Repository.Language)
const publisherRepository = container.resolve<Publisher.Repository>(Repository.Publisher)


export const bookGetAll: App.Action<Book.List.Request> = async (req, res) => {
  await schemaBookList.validate(req.query)
  const { search = '' } = req.query

  const books = search ? await bookRepository.search(search): await bookRepository.getAll()

  res.json(books)
}

export const bookGetById: App.Action<Book.Single.Request> = async (req, res) => {
  await schemaBookValidateId.validate(req.params)
  const book = await bookRepository.getByIdWithRelations(req.params.id)

  if (!book) {
    throw new NotFoundError()
  }

  res.json(book)
}

export const bookCreate: App.Action<Book.Create.Request> = async (req, res) => {
  await schemaBookCreate.validate(req.body, { abortEarly: false })

  const genre = await genreRepository.getById(req.body.genreId)
  const image = await fileRepository.getInfoById(req.body.imageId)
  const authors = await authorRepository.getByIdList(req.body.authors)
  const language = await languageRepository.getById(req.body.languageId)
  const publisher = await publisherRepository.getById(req.body.publisherId)

  const book = await bookRepository.create({ ...req.body, authors, publisher, genre, language, image})
  res.status(201).json(book)
}

export const bookUpdate: App.Action<Book.Update.Request> = async (req, res) => {
  await schemaBookUpdate.validate(req.body)

  const book = await bookRepository.getByIdWithRelations(req.body.id)
  const authors = req.body?.authors ? await authorRepository.getByIdList(req.body.authors) : undefined

  if (req.body?.authors) {
    await bookRepository.detachAllAuthors(book)
    await bookRepository.attachAuthors(book, authors)
  }

  const genre = req.body?.genreId ? await genreRepository.getById(req.body.genreId) : undefined
  const image = req.body?.imageId ? await fileRepository.getInfoById(req.body.imageId) : undefined
  const language = req.body?.languageId ? await languageRepository.getById(req.body.languageId) : undefined
  const publisher = req.body?.publisherId ? await publisherRepository.getById(req.body.publisherId) : undefined

  const bookData: DeepPartial<BookEntity> = pickBy({
    title: req.body?.title,
    year: req.body?.year,
    isbn: req.body?.isbn,
    description: req.body?.description,
    image,
    genre,
    publisher,
    language
  }, identity)

  const updatedBook = await bookRepository.update(req.body.id, bookData)
  res.json(updatedBook)
}

export const bookDelete: App.Action<Book.Delete.Request> = async (req, res) => {
  await schemaBookValidateId.validate(req.params)

  const book = await bookRepository.getById(req.params.id)

  if (!book) {
    throw new NotFoundError()
  }

  await bookRepository.detachAllAuthors(book)
  await bookRepository.delete(book)

  res.status(204).json()
}
