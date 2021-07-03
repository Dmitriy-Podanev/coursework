import { container } from 'tsyringe'
import { Repository } from '../enum/repository'
import { NotFoundError } from '../error/NotFoundError'
import { schemaGenreCreate, schemaGenreUpdate, schemaGenreValidId } from '../schema/genre'
import { App } from '../types/app'
import { Genre } from '../types/genre'

const genreRepository = container.resolve<Genre.Repository>(Repository.Genre)

export const genreGetAll: App.Action = async (req, res) => {
  const genres = await genreRepository.getAll()

  res.json(genres)
}

export const genreCreate: App.Action<Genre.Create.Request> = async (req, res) => {
  await schemaGenreCreate.validate(req.body)

  const genre = await genreRepository.create(req.body)

  res.status(201).json(genre)
}

export const genreUpdate: App.Action<Genre.Update.Request> = async (req, res) => {
  await schemaGenreUpdate.validate(req.body)

  const genreSrc = await genreRepository.getById(req.body.id)

  if (!genreSrc) {
    throw new NotFoundError()
  }

  const genre = await genreRepository.update(genreSrc.id, req.body)

  res.json(genre)
}

export const genreDelete: App.Action<Genre.Delete.Request> = async (req, res) => {
  await schemaGenreValidId.validate(req.params)

  const genre = await genreRepository.getById(req.params.id)

  if (!genre) {
    throw new NotFoundError()
  }

  await genreRepository.delete(genre)

  res.status(204).json()
}
