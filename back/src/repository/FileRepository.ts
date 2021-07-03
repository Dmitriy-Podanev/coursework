import { DeepPartial, getConnection } from 'typeorm'
import { FileEntity } from '../entity/FileEntity'
import { File } from '../types/file'

export class FileRepository implements File.Repository {
  async create (fileInfo: DeepPartial<FileEntity>): Promise<FileEntity> {
    return await getConnection()
      .getRepository(FileEntity)
      .save(fileInfo);
  }

  async delete (fileId: number | string): Promise<boolean> {
    return !!(await getConnection()
      .getRepository(FileEntity)
      .delete(fileId));
  }

  async getInfoById (fileId: string | number): Promise<FileEntity | undefined> {
    return await getConnection()
      .getRepository(FileEntity)
      .findOne(fileId);
  }

}
