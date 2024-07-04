import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  // Afficher toutes les catégories
  async index({ view }: HttpContext) {
    return view.render('pages/categories', {
      'pageTitle': 'Catégories d\'évènements',
    })
  }

  async show() {
  }

  async new() {
  }

  async edit() {
  }

  async delete() {
  }

}
