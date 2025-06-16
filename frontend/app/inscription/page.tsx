'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface RegisterData {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
  teacher_profile: {
    commission_scolaire: string
    school_name: string
    grade_levels: string[]
    subjects: string[]
    phone_number: string
  }
}

export default function InscriptionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
    teacher_profile: {
      commission_scolaire: '',
      school_name: '',
      grade_levels: [],
      subjects: [],
      phone_number: ''
    }
  })

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('teacher_profile.')) {
      const profileField = field.replace('teacher_profile.', '')
      setFormData(prev => ({
        ...prev,
        teacher_profile: {
          ...prev.teacher_profile,
          [profileField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        // Store tokens
        localStorage.setItem('access_token', data.tokens.access)
        localStorage.setItem('refresh_token', data.tokens.refresh)
        
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        setError(data.message || 'Une erreur est survenue lors de l\'inscription')
      }
    } catch (err) {
      setError('Erreur de connexion au serveur')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Inscription à MentorIA
          </CardTitle>
          <CardDescription className="text-center">
            Créez votre compte enseignant pour commencer
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Informations personnelles */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Informations personnelles</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="first_name">Prénom *</Label>
                  <Input
                    id="first_name"
                    type="text"
                    required
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Nom de famille *</Label>
                  <Input
                    id="last_name"
                    type="text"
                    required
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="username">Nom d'utilisateur *</Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email">Adresse email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.teacher_profile.phone_number}
                  onChange={(e) => handleInputChange('teacher_profile.phone_number', e.target.value)}
                />
              </div>
            </div>

            {/* Informations scolaires */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Informations scolaires</h3>
              
              <div>
                <Label htmlFor="commission_scolaire">Commission scolaire</Label>
                <Input
                  id="commission_scolaire"
                  type="text"
                  placeholder="ex: Commission scolaire de Montréal"
                  value={formData.teacher_profile.commission_scolaire}
                  onChange={(e) => handleInputChange('teacher_profile.commission_scolaire', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="school_name">École</Label>
                <Input
                  id="school_name"
                  type="text"
                  placeholder="Nom de votre école principale"
                  value={formData.teacher_profile.school_name}
                  onChange={(e) => handleInputChange('teacher_profile.school_name', e.target.value)}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Sécurité</h3>
              
              <div>
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="password_confirm">Confirmer le mot de passe *</Label>
                <Input
                  id="password_confirm"
                  type="password"
                  required
                  value={formData.password_confirm}
                  onChange={(e) => handleInputChange('password_confirm', e.target.value)}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                'S\'inscrire'
              )}
            </Button>
            
            <p className="text-sm text-center text-gray-600">
              Vous avez déjà un compte?{' '}
              <a href="/connexion" className="text-blue-600 hover:underline">
                Se connecter
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}