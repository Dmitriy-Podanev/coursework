import * as Yup from 'yup'
import { File } from '../types/file'

export const schemaFileUpload: Yup.SchemaOf<File.Create.Body> = Yup.object().shape({
  file: Yup.mixed().required()
})

export const schemaFileValidId: Yup.SchemaOf<File.Delete.Params | File.Single.Params> = Yup.object().shape({
  id: Yup.number().min(1).required()
})
