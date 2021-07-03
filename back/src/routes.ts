import { authLogin, authLogout, authRefresh } from './controller/AuthController'
import { authorCreate, authorDelete, authorGetAll, authorUpdate } from './controller/AuthorController'
import { bookCreate, bookDelete, bookGetAll, bookGetById, bookUpdate } from './controller/BookController'
import { fileGetDataById, fileGetInfoById, fileUpload } from './controller/FileController'
import { genreCreate, genreDelete, genreGetAll, genreUpdate } from './controller/GenreController'
import {
  languageById,
  languageCreate,
  languageDelete,
  languageGetAll,
  languageUpdate
} from './controller/LanguageController'
import { publisherCreate, publisherDelete, publisherGetAll, publisherUpdate } from './controller/PublisherController'
import { userCreate } from './controller/UserController'
import { authMiddleware } from './middleware/authMiddleware'
import { App } from './types/app'

export const Routes: App.Route[] = [
  {
    method: 'post',
    path: '/auth/login',
    action: authLogin
  },
  {
    method: 'post',
    path: '/auth/refresh',
    action: authRefresh
  },
  {
    method: 'post',
    path: '/auth/logout',
    middleware: [authMiddleware],
    action: authLogout
  },
  {
    method: 'post',
    path: '/users/create',
    action: userCreate
  },
  {
    method: 'get',
    path: '/books',
    middleware: [authMiddleware],
    action: bookGetAll
  },
  {
    method: 'get',
    path: '/books/:id',
    middleware: [authMiddleware],
    action: bookGetById
  },
  {
    method: 'post',
    path: '/books',
    middleware: [authMiddleware],
    action: bookCreate
  },
  {
    method: 'put',
    path: '/books',
    middleware: [authMiddleware],
    action: bookUpdate
  },
  {
    method: 'delete',
    path: '/books/:id',
    middleware: [authMiddleware],
    action: bookDelete
  },
  {
    method: 'get',
    path: '/authors',
    middleware: [authMiddleware],
    action: authorGetAll
  },
  {
    method: 'post',
    path: '/authors',
    middleware: [authMiddleware],
    action: authorCreate
  },
  {
    method: 'put',
    path: '/authors',
    middleware: [authMiddleware],
    action: authorUpdate
  },
  {
    method: 'delete',
    path: '/authors/:id',
    middleware: [authMiddleware],
    action: authorDelete
  },
  {
    method: 'get',
    path: '/genres',
    middleware: [authMiddleware],
    action: genreGetAll
  },
  {
    method: 'post',
    path: '/genres',
    middleware: [authMiddleware],
    action: genreCreate
  },
  {
    method: 'put',
    path: '/genres',
    middleware: [authMiddleware],
    action: genreUpdate
  },
  {
    method: 'delete',
    path: '/genres/:id',
    middleware: [authMiddleware],
    action: genreDelete
  },
  {
    method: 'get',
    path: '/languages',
    middleware: [authMiddleware],
    action: languageGetAll
  },
  {
    method: 'get',
    path: '/languages/:id',
    middleware: [authMiddleware],
    action: languageById
  },
  {
    method: 'post',
    path: '/languages',
    middleware: [authMiddleware],
    action: languageCreate
  },
  {
    method: 'put',
    path: '/languages',
    middleware: [authMiddleware],
    action: languageUpdate
  },
  {
    method: 'delete',
    path: '/languages/:id',
    middleware: [authMiddleware],
    action: languageDelete
  },
  {
    method: 'get',
    path: '/publishers',
    middleware: [authMiddleware],
    action: publisherGetAll
  },
  {
    method: 'post',
    path: '/publishers',
    middleware: [authMiddleware],
    action: publisherCreate
  },
  {
    method: 'put',
    path: '/publishers',
    middleware: [authMiddleware],
    action: publisherUpdate
  },
  {
    method: 'delete',
    path: '/publishers/:id',
    middleware: [authMiddleware],
    action: publisherDelete
  },
  {
    method: 'post',
    path: '/files/upload',
    middleware: [authMiddleware],
    action: fileUpload
  },
  {
    method: 'get',
    path: '/files/info/:id',
    middleware: [authMiddleware],
    action: fileGetInfoById
  },
  {
    method: 'get',
    path: '/files/:id',
    middleware: [authMiddleware],
    action: fileGetDataById
  }
]
