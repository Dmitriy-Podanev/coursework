import { container, Lifecycle } from 'tsyringe'
import { Repository } from './enum/repository'
import { Service } from './enum/service'
import { AuthorRepository } from './repository/AuthorRepository'
import { BookRepository } from './repository/BookRepository'
import { FileRepository } from './repository/FileRepository'
import { GenreRepository } from './repository/GenreRepository'
import { LanguageRepository } from './repository/LanguageRepository'
import { PublisherRepository } from './repository/PublisherRepository'
import { UserRepository } from './repository/UserRepository'
import { AuthService } from './service/AuthService'
import { ConfigServiceJson } from './service/ConfigServiceJson'
import { FileService } from './service/FileService'
import { LoggerService } from './service/LoggerService'
import { Auth } from './types/auth'
import { Author } from './types/author'
import { Book } from './types/book'
import { Config } from './types/config'
import { File } from './types/file'
import { Genre } from './types/genre'
import { Language } from './types/language'
import { Logger } from './types/logger'
import { Publisher } from './types/publisher'
import { User } from './types/user'

/* Services */
container.register<Config.Service>(Service.Config, { useClass: ConfigServiceJson }, { lifecycle: Lifecycle.Singleton })
container.register<Logger.Service>(Service.Logger, { useClass: LoggerService }, { lifecycle: Lifecycle.Singleton })
container.register<Auth.Service>(Service.Auth, { useClass: AuthService })
container.register<File.Service>(Service.File, { useClass: FileService })

/* Repositories */
container.register<User.Repository>(Repository.User, { useClass: UserRepository })
container.register<Book.Repository>(Repository.Book, { useClass: BookRepository })
container.register<Author.Repository>(Repository.Author, { useClass: AuthorRepository })
container.register<Genre.Repository>(Repository.Genre, { useClass: GenreRepository })
container.register<Language.Repository>(Repository.Language, { useClass: LanguageRepository })
container.register<Publisher.Repository>(Repository.Publisher, { useClass: PublisherRepository })
container.register<File.Repository>(Repository.File, { useClass: FileRepository })
