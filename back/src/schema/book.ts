import { container } from 'tsyringe'
import * as Yup from 'yup'
import { Repository } from '../enum/repository'
import { Author } from '../types/author'
import { Book } from '../types/book'

const bookRepository = container.resolve<Book.Repository>(Repository.Book)

const uniqueIsbn = async isbn => !(await bookRepository.hasExistIsbn(isbn))

export const schemaBookList: Yup.SchemaOf<Author.List.Query> = Yup.object().shape({
  search: Yup.string()
})

export const schemaBookCreate: Yup.SchemaOf<Book.Create.Body> = Yup.object().shape({
  title: Yup.string().required(),
  year: Yup.number().required(),
  isbn: Yup.string().required().test('unique', 'ISBN must be unique', uniqueIsbn),
  genreId: Yup.number().required(),
  imageId: Yup.number().required(),
  publisherId: Yup.number().required(),
  languageId: Yup.number().required(),
  authors: Yup.array().required(),
  description: Yup.string()
})

export const schemaBookUpdate: Yup.SchemaOf<Book.Update.Body> = Yup.object().shape({
  id: Yup.number().min(1).required(),
  title: Yup.string(),
  year: Yup.number(),
  isbn: Yup.string().test('unique', 'ISBN must be unique', uniqueIsbn),
  imageId: Yup.number(),
  genreId: Yup.number(),
  description: Yup.string(),
  publisherId: Yup.number(),
  languageId: Yup.number(),
  authors: Yup.array()
})

export const schemaBookValidateId: Yup.SchemaOf<Book.Delete.Params | Book.Single.Params> = Yup.object().shape({
  id: Yup.number().min(1).required()
})
