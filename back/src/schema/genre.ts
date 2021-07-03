import { container } from 'tsyringe'
import * as Yup from 'yup'
import { Repository } from '../enum/repository'
import { Genre } from '../types/genre'

const genreRepository = container.resolve<Genre.Repository>(Repository.Genre)

const uniqueName = async name => !(await genreRepository.hasExist(name))

export const schemaGenreCreate: Yup.SchemaOf<Genre.Create.Body> = Yup.object().shape({
  name: Yup.string().required().test('unique', 'name must be unique', uniqueName)
})

export const schemaGenreUpdate: Yup.SchemaOf<Genre.Update.Body> = Yup.object().shape({
  id: Yup.number().min(1).required(),
  name: Yup.string().required().test('unique', 'name must be unique', uniqueName)
})

export const schemaGenreValidId: Yup.SchemaOf<Genre.Delete.Params | Genre.Single.Params> = Yup.object().shape({
  id: Yup.number().min(1).required()
})
