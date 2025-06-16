'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  teacher_profile: {
    commission_scolaire: string
    school_name: string
    grade_levels: string[]
    subjects: string[]
    phone_number: string
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push('/connexion')
      return
    }

    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:8000/api/auth/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        // Token might be expired
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        router.push('/connexion')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      router.push('/connexion')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MentorIA</h1>
              <p className="text-gray-600">Tableau de bord enseignant</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Se déconnecter
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Bonjour, {user.first_name} {user.last_name}!
            </h2>
            <p className="text-gray-600">
              Bienvenue sur votre tableau de bord MentorIA
            </p>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
                <CardDescription>Vos informations de profil</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-medium">Nom d'utilisateur:</span> {user.username}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                {user.teacher_profile.phone_number && (
                  <div>
                    <span className="font-medium">Téléphone:</span> {user.teacher_profile.phone_number}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations scolaires</CardTitle>
                <CardDescription>Votre affiliation scolaire</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {user.teacher_profile.commission_scolaire && (
                  <div>
                    <span className="font-medium">Commission scolaire:</span> {user.teacher_profile.commission_scolaire}
                  </div>
                )}
                {user.teacher_profile.school_name && (
                  <div>
                    <span className="font-medium">École:</span> {user.teacher_profile.school_name}
                  </div>
                )}
                {user.teacher_profile.grade_levels.length > 0 && (
                  <div>
                    <span className="font-medium">Niveaux:</span> {user.teacher_profile.grade_levels.join(', ')}
                  </div>
                )}
                {user.teacher_profile.subjects.length > 0 && (
                  <div>
                    <span className="font-medium">Matières:</span> {user.teacher_profile.subjects.join(', ')}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Commencez à utiliser MentorIA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col space-y-2">
                  <span className="text-lg">📝</span>
                  <span>Créer un exercice</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <span className="text-lg">🔍</span>
                  <span>Rechercher des ressources</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2">
                  <span className="text-lg">⚙️</span>
                  <span>Modifier le profil</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}