import { Navigation } from './types'

export const navigation: Navigation[] = [
  {
    path: '/catalog',
    text: 'Каталог'
  },
  {
    text: 'Справочники',
    // path: '/ref',
    child: [
      {
        path: '/ref/languages',
        text: 'Языки'
      },
      {
        path: '/ref/publishers',
        text: 'Издательства'
      },
      {
        path: '/ref/genres',
        text: 'Жанры'
      },
      {
        path: '/ref/authors',
        text: 'Авторы'
      }
    ]
  }
]
