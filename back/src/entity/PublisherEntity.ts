/**
 * Издательство
 */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BookEntity } from './BookEntity'

@Entity('publisher')
export class PublisherEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @OneToMany(() => BookEntity, ({ publisher }) => publisher)
  books: BookEntity
}
