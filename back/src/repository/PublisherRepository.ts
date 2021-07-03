import { injectable } from 'tsyringe'
import { DeepPartial, getConnection, Like } from 'typeorm'
import { PublisherEntity } from '../entity/PublisherEntity'
import { Publisher } from '../types/publisher'

@injectable()
export class PublisherRepository implements Publisher.Repository {
  async create (publisherData: DeepPartial<PublisherEntity>): Promise<PublisherEntity> {
    return await getConnection()
      .getRepository(PublisherEntity)
      .save(publisherData)
  }

  async delete (publisher: PublisherEntity): Promise<void> {
    await getConnection()
      .getRepository(PublisherEntity)
      .delete(publisher)
  }

  async getAll (): Promise<PublisherEntity[]> {
    return await getConnection()
      .getRepository(PublisherEntity)
      .find()
  }

  async getById (publisherId: string | number): Promise<PublisherEntity | undefined> {
    return await getConnection()
      .getRepository(PublisherEntity)
      .findOne(publisherId)
  }

  async hasExist (name: string): Promise<boolean> {
    return !!(await getConnection()
      .getRepository(PublisherEntity)
      .count({
        where: { name }
      }))
  }

  async search (value: string): Promise<PublisherEntity[]> {
    const searchString = `%${value.replace(/\s+/gi, '%')}%`

    return await getConnection()
      .getRepository(PublisherEntity)
      .find({ name: Like<string>(searchString) })
  }

  async update (publisherId: number | string, publisherData: DeepPartial<PublisherEntity>): Promise<PublisherEntity> {
    await getConnection()
      .getRepository(PublisherEntity)
      .update(publisherId, publisherData)

    return await getConnection()
      .getRepository(PublisherEntity)
      .findOne(publisherId)
  }

}
