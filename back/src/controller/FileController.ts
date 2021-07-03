import { UploadedFile } from 'express-fileupload'
import { container } from 'tsyringe'
import { DeepPartial } from 'typeorm'
import { v4 } from 'uuid'
import { FileEntity } from '../entity/FileEntity'
import { Repository } from '../enum/repository'
import { Service } from '../enum/service'
import { NotFoundError } from '../error/NotFoundError'
import { schemaFileUpload, schemaFileValidId } from '../schema/file'
import { App } from '../types/app'
import { File } from '../types/file'

const fileRepository = container.resolve<File.Repository>(Repository.File)
const fileService = container.resolve<File.Service>(Service.File)

export const fileUpload: App.Action<File.Create.Request> = async (req, res) => {
  await schemaFileUpload.validate(req.files)

  const { mimetype, mv, size, name } = req.files.file as UploadedFile
  const extension = fileService.getExtension(name)
  const fileName = `${v4()}.${extension}`

  await mv(fileService.getFullPath(fileName))


  const fileInfo: DeepPartial<FileEntity> = {
    originName: name,
    mime: mimetype,
    fileName,
    size,
    extension
  }

  const file = await fileRepository.create(fileInfo)

  res.json(file)
}

export const fileGetInfoById: App.Action<File.Single.Request> = async (req, res) => {
  await schemaFileValidId.validate(req.params)

  const file = await fileRepository.getInfoById(req.params.id)
  if (!file) {
    throw new NotFoundError()
  }

  res.json(file)
}

export const fileGetDataById: App.Action<File.Single.Request> = async (req, res) => {
  await schemaFileValidId.validate(req.params)

  const file = await fileRepository.getInfoById(req.params.id)
  if (!file) {
    throw new NotFoundError()
  }

  const path = fileService.getFullPath(file.fileName)

  res.setHeader('Content-Disposition', `attachment; filename="${file.originName}"`)
  res.sendFile(path)
}
