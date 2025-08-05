import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { Challenge } from "../models/challenge.interface"

@Injectable({
  providedIn: "root",
})
export class ChallengeService {
  private challengesSubject = new BehaviorSubject<Challenge[]>([])
  public challenges$ = this.challengesSubject.asObservable()

  private mockChallenges: Challenge[] = [
    {
      id: 1,
      title: "Défi zéro déchet d'une semaine",
      description: "Relevez le défi de réduire vos déchets au maximum pendant une semaine complète.",
      longDescription: `Ce défi vous invite à repenser votre consommation et à adopter des gestes simples mais efficaces pour réduire votre empreinte écologique.

Voici quelques idées pour vous aider :
• Utilisez une gourde réutilisable au lieu de bouteilles en plastique
• Apportez votre déjeuner dans des contenants réutilisables
• Refusez les sacs plastiques et utilisez un sac réutilisable
• Compostez vos déchets organiques
• Réparez au lieu de jeter
• Privilégiez les produits avec moins d'emballage

Partagez vos astuces, vos difficultés et vos réussites avec la communauté !`,
      category: "Écologique",
      categoryColor: "bg-green-100 text-green-700",
      categoryIcon: "🌱",
      startDate: new Date(2024, 0, 20),
      endDate: new Date(2024, 0, 27),
      participants: 8,
      progress: 65,
      timeLeft: "3 jours",
      status: "En cours",
      points: 75,
      difficulty: "Facile",
      estimatedTime: "15 min/jour",
      organizer: {
        name: "Marie Dubois",
        avatar: "/assets/images/avatars/marie.jpg",
        role: "Responsable RSE",
      },
    },
    {
      id: 2,
      title: "Création d'un mur d'expression",
      description: "Concevez et réalisez un mur d'expression créatif pour égayer l'espace de travail.",
      category: "Créatif",
      categoryColor: "bg-yellow-100 text-yellow-700",
      categoryIcon: "🎨",
      startDate: new Date(2024, 0, 25),
      endDate: new Date(2024, 1, 1),
      participants: 5,
      progress: 30,
      timeLeft: "8 jours",
      status: "En cours",
      points: 60,
      difficulty: "Moyen",
      estimatedTime: "20 min/jour",
    },
    {
      id: 3,
      title: "Collecte de vêtements pour l'hiver",
      description: "Organisez une collecte de vêtements chauds pour les personnes dans le besoin.",
      category: "Solidaire",
      categoryColor: "bg-pink-100 text-pink-700",
      categoryIcon: "❤️",
      startDate: new Date(2024, 0, 15),
      endDate: new Date(2024, 0, 22),
      participants: 12,
      status: "Terminé",
      points: 50,
    },
  ]

  constructor() {
    this.challengesSubject.next(this.mockChallenges)
  }

  getChallenges(): Observable<Challenge[]> {
    return this.challenges$
  }

  getChallengeById(id: number): Observable<Challenge | undefined> {
    return new BehaviorSubject(this.mockChallenges.find((c) => c.id === id)).asObservable()
  }

  getActiveChallenges(): Observable<Challenge[]> {
    return new BehaviorSubject(this.mockChallenges.filter((c) => c.status === "En cours")).asObservable()
  }

  getUpcomingChallenges(): Observable<Challenge[]> {
    return new BehaviorSubject(this.mockChallenges.filter((c) => c.status === "À venir")).asObservable()
  }

  getCompletedChallenges(): Observable<Challenge[]> {
    return new BehaviorSubject(this.mockChallenges.filter((c) => c.status === "Terminé")).asObservable()
  }
}
