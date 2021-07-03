/**
 * Язык
 */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BookEntity } from './BookEntity'

@Entity('language')
export class LanguageEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @OneToMany(() => BookEntity, ({ language }) => language)
  books: BookEntity
}
