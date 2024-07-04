import type { HttpContext } from '@adonisjs/core/http'
import Speaker from '#models/speaker'

export default class SpeakersController {
  async index({ view }: HttpContext) {

    const speakers = await Speaker.all()

    return view.render('pages/speakers', {
      'pageTitle': 'Liste des speakers',
      'speakers': speakers,
    })
  }
}
