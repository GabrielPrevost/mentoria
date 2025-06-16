import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MentorIA</h1>
              <span className="ml-2 text-sm text-gray-500">Bêta</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/connexion">
                <Button variant="outline">Se connecter</Button>
              </Link>
              <Link href="/inscription">
                <Button>S'inscrire</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            L'assistant IA pour les enseignants du Québec
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Créez des exercices personnalisés, recherchez des ressources pédagogiques 
            et optimisez votre workflow d'enseignement avec l'intelligence artificielle.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/inscription">
              <Button size="lg" className="px-8 py-3">
                Commencer gratuitement
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3">
              En savoir plus
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">🤖</div>
              <CardTitle>Génération d'exercices</CardTitle>
              <CardDescription>
                Créez des exercices personnalisés avec l'IA en fonction du niveau et de la matière
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Aligné sur le programme du Québec</li>
                <li>• Adapté au niveau des élèves</li>
                <li>• Export PDF et Word</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">🔍</div>
              <CardTitle>Recherche de ressources</CardTitle>
              <CardDescription>
                Trouvez rapidement des ressources pédagogiques pertinentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Base de données du MEES</li>
                <li>• Ressources communautaires</li>
                <li>• Filtres avancés</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="text-4xl mb-4">⚡</div>
              <CardTitle>Workflow optimisé</CardTitle>
              <CardDescription>
                Gagnez du temps dans votre préparation de cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Interface intuitive</li>
                <li>• Sauvegarde automatique</li>
                <li>• Collaboration entre enseignants</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Prêt à transformer votre enseignement?
          </h3>
          <p className="text-blue-100 mb-6">
            Rejoignez les enseignants qui utilisent déjà MentorIA pour créer 
            des expériences d'apprentissage exceptionnelles.
          </p>
          <Link href="/inscription">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Créer mon compte enseignant
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">MentorIA</h4>
              <p className="text-gray-300">
                L'assistant IA conçu spécialement pour les enseignants du Québec.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Fonctionnalités</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Génération d'exercices</li>
                <li>Recherche de ressources</li>
                <li>Export de documents</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Documentation</li>
                <li>Contact</li>
                <li>Formation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MentorIA. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}