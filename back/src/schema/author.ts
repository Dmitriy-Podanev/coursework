import { container } from 'tsyringe'
import * as Yup from 'yup'
import { Repository } from '../enum/repository'
import { Author } from '../types/author'

const authorRepository = container.resolve<Author.Repository>(Repository.Author)

const uniqueName = async name => !(await authorRepository.hasExist(name))

export const schemaAuthorList: Yup.SchemaOf<Author.List.Query> = Yup.object().shape({
  search: Yup.string()
})

export const schemaAuthorCreate: Yup.SchemaOf<Author.Create.Body> = Yup.object().shape({
  name: Yup.string().required().test('unique', 'name must be unique', uniqueName)
})

export const schemaAuthorUpdate: Yup.SchemaOf<Author.Update.Body> = Yup.object().shape({
  id: Yup.number().min(1).required(),
  name: Yup.string().required().test('unique', 'name must be unique', uniqueName)
})

export const schemaAuthorValidId: Yup.SchemaOf<Author.Delete.Params | Author.Single.Params> = Yup.object().shape({
  id: Yup.number().min(1).required()
})
