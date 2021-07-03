/**
 * Файл
 */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BookEntity } from './BookEntity'

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  originName: string

  @Column()
  fileName: string

  @Column()
  extension: string

  @Column()
  mime: string

  @Column()
  size: number

  @CreateDateColumn()
  createdAt: Date

  @OneToMany(() => BookEntity, ({ image }) => image)
  book: BookEntity
}
