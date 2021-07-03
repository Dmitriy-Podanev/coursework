/**
 * Жанр
 */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BookEntity } from './BookEntity'

@Entity('genre')
export class GenreEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @OneToMany(() => BookEntity, ({ language }) => language)
  books: BookEntity
}
