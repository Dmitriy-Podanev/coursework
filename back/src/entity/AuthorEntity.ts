/**
 * Автор
 */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BookEntity } from './BookEntity'

@Entity('author')
export class AuthorEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @ManyToMany(() => BookEntity)
  @JoinTable({ name: 'book_author' })
  books: BookEntity[]
}
