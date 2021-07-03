/**
 * Книга
 */
import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { AuthorEntity } from './AuthorEntity'
import { FileEntity } from './FileEntity'
import { GenreEntity } from './GenreEntity'
import { LanguageEntity } from './LanguageEntity'
import { PublisherEntity } from './PublisherEntity'

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  year: number

  @Column({ unique: true })
  isbn: string

  @Column('text', { nullable: true })
  description: string

  @ManyToOne(() => FileEntity, ({ book }) => book, { nullable: true, onDelete: 'SET NULL' })
  image: FileEntity

  @ManyToOne(() => PublisherEntity, ({ books }) => books, { nullable: true, onDelete: 'SET NULL' })
  publisher: PublisherEntity

  @ManyToOne(() => LanguageEntity, ({ books }) => books, { nullable: true, onDelete: 'SET NULL' })
  language: LanguageEntity

  @ManyToOne(() => GenreEntity, ({ books }) => books, { nullable: true, onDelete: 'SET NULL' })
  genre: GenreEntity

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => AuthorEntity)
  @JoinTable({ name: 'book_author' })
  authors: AuthorEntity[]
}
