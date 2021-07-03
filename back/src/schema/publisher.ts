import { container } from 'tsyringe'
import * as Yup from 'yup'
import { Repository } from '../enum/repository'
import { Author } from '../types/author'
import { Publisher } from '../types/publisher'

const publisherRepository = container.resolve<Publisher.Repository>(Repository.Publisher)

const uniqueName = async name => !(await publisherRepository.hasExist(name))

export const schemaPublisherList: Yup.SchemaOf<Author.List.Query> = Yup.object().shape({
  search: Yup.string()
})

export const schemaPublisherCreate: Yup.SchemaOf<Publisher.Create.Body> = Yup.object().shape({
  name: Yup.string().required().test('unique', 'name must be unique', uniqueName)
})

export const schemaPublisherUpdate: Yup.SchemaOf<Publisher.Update.Body> = Yup.object().shape({
  id: Yup.number().min(1).required(),
  name: Yup.string().required().test('unique', 'name must be unique', uniqueName)
})

export const schemaPublisherValidId: Yup.SchemaOf<Publisher.Delete.Params> = Yup.object().shape({
  id: Yup.number().min(1).required()
})
