import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { AuthorEntity } from '../entity/AuthorEntity'

export class AuthorSeed1616422138645 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const repository = getRepository(AuthorEntity)

    await repository.save({ name: 'Борис Черный' })
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const repository = getRepository(AuthorEntity)

    await repository.delete({ name: 'Борис Черный' })
  }
}
