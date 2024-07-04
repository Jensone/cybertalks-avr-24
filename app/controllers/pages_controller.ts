import type { HttpContext, Request } from '@adonisjs/core/http'

export default class PagesController {
  // Logique de la route contact
  async contact({ view }: HttpContext) {
    return view.render('pages/contact', {
      pageTitle: 'Nous contacter',
    })
  }
}
