/**
 * Пользователь
 */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  login: string

  @Column({ unique: true })
  email: string

  @Column({ default: true })
  enable: boolean

  @Column({ select: false })
  passwordHash: string

  @Column({ select: false, nullable: true })
  refreshToken: string

  @Column({ select: false, nullable: true })
  refreshTokenExp: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
