import { DateTime } from 'luxon'
import factory from '@adonisjs/lucid/factories'
import Event from '#models/event'
import { SpeakerFactory } from '#database/factories/speaker_factory'

export const EventFactory = factory
  .define(Event, async ({ faker }) => {
    const title = faker.lorem.sentence() // On génère un titre aléatoire
    return {
      title: title,
      slug: faker.helpers.slugify(title), // On génère un slug à partir du titre
      description: faker.lorem.paragraphs(),
      isOnline: faker.datatype.boolean(),
      date: DateTime.now(),
      // category: faker.number.int({ min: 1, max: 4 }),
    }
  })
  .relation('speakers', () => SpeakerFactory)
  .build()
