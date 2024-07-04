import factory from '@adonisjs/lucid/factories'
import Category from '#models/category'
import { EventFactory } from './event_factory.js'

export const CategoryFactory = factory
  .define(Category, async ({ faker }) => {
    const name = faker.lorem.word() // On génère un nom aléatoire
    return {
      'name': name,
      'slug': faker.helpers.slugify(name), // On génère un slug à partir du nom
    }
  })
  .build()
