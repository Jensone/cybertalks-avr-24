# Controllers

Les contrôleurs sont des classes qui représentent les routes HTTP.
Ils sont utilisés pour récupérer les données de la base de données et les afficher dans les templates.

## Utilisation d'un contrôleur

Pour utiliser un contrôleur, il faut importer le fichier dans une route.

```ts
import CategoriesController from '#controllers/categories_controller'
```

Et il suffira ensuite de l'utiliser dans la route.

```ts
router.get('/categories', [CategoriesController, 'index']).as('categories')
```

## Création d'un contrôleur

Pour créer un contrôleur, il faut créer un fichier dans le dossier `app/controllers` et le nommer comme le nom de la table dans la base de données.

Mais avec la commande `node ace make:controller` ce sera automatiquement fait pour vous.

```bash
node ace make:controller Categories
```

Vous devriez avoir un fichier `app/controllers/categories_controller.ts` avec le contenu suivant:

```ts
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  async index({ view }: HttpContext) {
    return view.render('pages/categories', {
      'pageTitle': 'Catégories d\'évènements',
    })
  }
}
```

Dans cet exemple, lors du rendu de la page, nous affichons le contenu de la 
vue `pages/categories.edge` avec le titre `Catégories d'évènements` en tant que variable qui sera disponible dans le template.

## Utilisation d'un contrôleur avec un formulaire

Pour utiliser un contrôleur avec un formulaire, il faut plusieurs choses :

- Créer une route pour le formulaire
- Créer une route pour la méthode POST
- Créer une vue pour le formulaire
- Créer un contrôleur pour le formulaire

### Création d'une route pour le formulaire

Pour créer une route pour le formulaire, il faut utiliser la méthode `router.get()` :

```ts
router.get('/categories/new', [CategoriesController, 'create']).as('categoryNew')
```

Dans cet exemple, nous avons créé une route pour le formulaire `categories/new` qui appelle la méthode `create` du contrôleur `CategoriesController`. Cette route est accessible en GET et nous affichera le formulaire.

### Création d'une route pour la méthode POST

Pour créer une route pour la méthode POST, il faut utiliser la méthode `router.post()` :

```ts
router.post('/categories/new', [CategoriesController, 'create']).as('categoryNew')
```

Dans cet exemple, nous avons créé une route pour le formulaire `categories/new` qui appelle la méthode `create` du contrôleur `CategoriesController`.

### Création d'une vue pour le formulaire

Pour créer une vue pour le formulaire, il faut créer un fichier dans le dossier `resources/views/pages` et le nommer comme le nom de la route.

Mais avec la commande `node ace make:view` ce sera automatiquement fait pour vous.

```bash
node ace make:view pages/categories/new
```

Vous devriez avoir un fichier `resources/views/pages/categories/new.edge` avec le contenu suivant:

```edge
@layout.main()

@slot('main')
<form action="{{ route('categoryNew') }}" method="post" class="flex flex-col gap-5 text-neutral-700">
  {{ csrfField() }}
  <input type="text" name="name" placeholder="Cybertalks">
  <input type="text" name="slug" placeholder="cybertalks">
  <button type="submit">Créer</button>
</form>
@endslot

@end
```

Dans cet exemple, nous avons créé une vue pour le formulaire `categories/new` qui appelle la méthode `create` du contrôleur `CategoriesController`.

### Création d'un contrôleur pour le formulaire

Pour créer un contrôleur pour le formulaire, il faut créer un fichier dans le dossier `app/controllers` et le nommer comme le nom de la route.

Mais avec la commande `node ace make:controller` ce sera automatiquement fait pour vous.

```bash
node ace make:controller Category
```

Puis on rédige le code du contrôleur :

```ts
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoryController {
  async create({ request, response}: HttpContext) {
    if (request.method() ==='POST') {
      const data = await request.body()
      console.log(data)
      const category = await Category.create({
        name: data.name,
        slug: data.slug,
      })

      return response.ctx?.view.render('pages/categories_new', {
        'message': 'Création d\'une nouvelle catégorie réussie',
      })
    }

    return response.ctx?.view.render('pages/categories_new')
  }

  ```

La première chose c'est l'injection de dépendances dans le contrôleur. Pour notre besoin il s'agit de la classe `HttpContext` avec `request` et `response` qui nous permet d'accéder à la requête et la réponse.

La seconde chose c'est la condition d'affichage dans la méthode `create`. Si la requête est de type POST, on récupère les données du formulaire et on les insère dans la base de données. On n'oublie pas de renvoyer un message de succès à la vue.

Dans le cas ou la requete est en GET, on renvoie la vue sans aucune modification.


