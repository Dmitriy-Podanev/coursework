import { injectable } from 'tsyringe'
import { DeepPartial, getConnection } from 'typeorm'
import { LanguageEntity } from '../entity/LanguageEntity'
import { Language } from '../types/language'

@injectable()
export class LanguageRepository implements Language.Repository {
  async create (languageData: DeepPartial<LanguageEntity>): Promise<LanguageEntity> {
    return await getConnection()
      .getRepository(LanguageEntity)
      .save(languageData)
  }

  async delete (language: LanguageEntity): Promise<void> {
    await getConnection()
      .getRepository(LanguageEntity)
      .delete(language)
  }

  async getAll (): Promise<LanguageEntity[]> {
    return await getConnection()
      .getRepository(LanguageEntity)
      .find()
  }

  async getById (languageId: string | number): Promise<LanguageEntity | undefined> {
    return await getConnection()
      .getRepository(LanguageEntity)
      .findOne(languageId)
  }

  async hasExist (name: string): Promise<boolean> {
    return !!(await getConnection()
      .getRepository(LanguageEntity)
      .count({
        where: { name }
      }))
  }

  async update (languageId: number | string, languageData: DeepPartial<LanguageEntity>): Promise<LanguageEntity> {
    await getConnection()
      .getRepository(LanguageEntity)
      .update(languageId, languageData)

    return await getConnection()
      .getRepository(LanguageEntity)
      .findOne(languageId)
  }

}
