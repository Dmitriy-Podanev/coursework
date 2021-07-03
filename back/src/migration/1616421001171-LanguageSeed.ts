import { getRepository, MigrationInterface, QueryRunner } from 'typeorm'
import { LanguageEntity } from '../entity/LanguageEntity'

export class LanguageSeed1616421001171 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const repository = getRepository(LanguageEntity)

    await repository.save({ name: 'Русский' })
    await repository.save({ name: 'Английский' })
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const repository = getRepository(LanguageEntity)

    await repository.delete({ name: 'Русский' })
    await repository.delete({ name: 'Английский' })
  }
}
