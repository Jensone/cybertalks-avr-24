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

  async create({ request, response}: HttpContext) {
    if (request.method() ==='POST') {
      const data = await request.body()
      console.log(data)
      const speaker = await Speaker.create({
        name: data.name,
        speciality: data.speciality,
        exp: data.exp,
        country: data.country,
      })

      return response.ctx?.view.render('pages/speakers_new', {
        'message': 'Création d\'un nouveau speaker réussie',
      })
    }

    return response.ctx?.view.render('pages/speakers_new')
  }
}
