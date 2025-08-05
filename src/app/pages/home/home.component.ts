import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HeaderComponent } from "../../components/header/header.component"
import type { ChallengeService } from "../../services/challenge.service"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>

      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 text-white py-20">
        <div class="max-w-4xl mx-auto text-center px-4">
          <h2 class="text-5xl font-bold mb-6">Relevez des défis qui ont du sens</h2>
          <p class="text-xl mb-8 opacity-90">
            Participez chaque semaine à des micro-challenges solidaires, écologiques<br>
            ou créatifs. Ensemble, créons un impact positif en seulement 15 minutes.
          </p>
          <a routerLink="/dashboard" class="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
            Commencer un défi
            <span class="ml-2">→</span>
          </a>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center" *ngFor="let stat of stats">
              <div class="flex justify-center mb-4">
                <span class="text-4xl">{{ stat.icon }}</span>
              </div>
              <div class="text-3xl font-bold text-gray-900 mb-2">{{ stat.value }}</div>
              <div class="text-gray-600">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Recent Challenges Section -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
          <div class="text-center mb-12">
            <h3 class="text-3xl font-bold text-gray-900 mb-4">Défis récents</h3>
            <p class="text-gray-600 max-w-2xl mx-auto">
              Découvrez les derniers défis proposés par notre communauté et rejoignez l'aventure collaborative.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div *ngFor="let challenge of recentChallenges" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <!-- Challenge Image -->
              <div class="relative">
                <div class="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center">
                  <span class="text-6xl">{{ challenge.categoryIcon }}</span>
                </div>
                <div class="absolute top-4 left-4">
                  <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + challenge.categoryColor">
                    <span class="mr-1">{{ challenge.categoryIcon }}</span>
                    {{ challenge.category }}
                  </span>
                </div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700 flex items-center gap-1">
                  🕒 {{ challenge.timeLeft }}
                </div>
              </div>

              <!-- Challenge Content -->
              <div class="p-6">
                <h4 class="text-lg font-bold mb-2">{{ challenge.title }}</h4>
                <p class="text-sm text-gray-600 mb-4">{{ challenge.description }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div class="flex items-center gap-1">
                    📅 {{ challenge.startDate }} - {{ challenge.endDate }}
                  </div>
                  <div class="flex items-center gap-1">
                    👥 {{ challenge.participants }} participants
                  </div>
                </div>

                <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors">
                  Participer
                </button>
              </div>
            </div>
          </div>

          <div class="text-center">
            <a routerLink="/dashboard" class="inline-block bg-yellow-400 hover:bg-yellow-500 text-black border border-yellow-400 font-semibold py-3 px-8 rounded-lg transition-colors">
              Voir tous les défis
            </a>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
        <div class="max-w-4xl mx-auto text-center px-4">
          <h3 class="text-4xl font-bold mb-6">Prêt à faire la différence ?</h3>
          <p class="text-xl mb-8 opacity-90">
            Rejoignez notre communauté et participez à des actions concrètes pour un<br>
            monde meilleur, une micro-action à la fois.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/dashboard" class="inline-block bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors">
              Commencer maintenant
            </a>
            <a routerLink="/group" class="inline-block border border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg bg-transparent transition-colors">
              Rejoindre un groupe
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-6xl mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span class="text-white font-bold text-sm">MC</span>
                </div>
                <div>
                  <h4 class="font-bold">Micro-Challenges</h4>
                  <p class="text-sm text-gray-400">Positive innovation</p>
                </div>
              </div>
              <p class="text-gray-400 text-sm">Créons ensemble un impact positif, 15 minutes à la fois.</p>
            </div>

            <div>
              <h5 class="font-semibold mb-4">Défis</h5>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="#" class="hover:text-white">Écologiques</a></li>
                <li><a href="#" class="hover:text-white">Solidaires</a></li>
                <li><a href="#" class="hover:text-white">Créatifs</a></li>
                <li><a href="#" class="hover:text-white">Proposer un défi</a></li>
              </ul>
            </div>

            <div>
              <h5 class="font-semibold mb-4">Communauté</h5>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="#" class="hover:text-white">Mon groupe</a></li>
                <li><a href="#" class="hover:text-white">Classements</a></li>
                <li><a href="#" class="hover:text-white">Badges</a></li>
                <li><a href="#" class="hover:text-white">Récompenses</a></li>
              </ul>
            </div>

            <div>
              <h5 class="font-semibold mb-4">Support</h5>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><a href="#" class="hover:text-white">Centre d'aide</a></li>
                <li><a href="#" class="hover:text-white">Contact</a></li>
                <li><a href="#" class="hover:text-white">Confidentialité</a></li>
                <li><a href="#" class="hover:text-white">Conditions</a></li>
              </ul>
            </div>
          </div>

          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 TAIAN - Micro-Challenges. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  stats = [
    { icon: "👥", value: "247", label: "Participants actifs" },
    { icon: "🎯", value: "156", label: "Défis réalisés" },
    { icon: "🏆", value: "89", label: "Badges débloqués" },
    { icon: "📅", value: "12", label: "Défis cette semaine" },
  ]

  recentChallenges = [
    {
      id: 1,
      title: "Collecte de vêtements pour l'hiver",
      description: "Organisez une collecte de vêtements chauds pour les personnes dans le besoin de votre quartier.",
      category: "Solidaire",
      categoryColor: "bg-pink-100 text-pink-700",
      categoryIcon: "❤️",
      startDate: "15 Jan",
      endDate: "22 Jan",
      participants: 12,
      timeLeft: "7 jours",
    },
    {
      id: 2,
      title: "Défi zéro déchet d'une semaine",
      description: "Relevez le défi de réduire vos déchets au maximum pendant une semaine complète.",
      category: "Écologique",
      categoryColor: "bg-green-100 text-green-700",
      categoryIcon: "🌱",
      startDate: "20 Jan",
      endDate: "27 Jan",
      participants: 8,
      timeLeft: "7 jours",
    },
    {
      id: 3,
      title: "Création d'un mur d'expression",
      description: "Concevez et réalisez un mur d'expression créatif pour égayer l'espace de travail.",
      category: "Créatif",
      categoryColor: "bg-yellow-100 text-yellow-700",
      categoryIcon: "🎨",
      startDate: "25 Jan",
      endDate: "1 Fév",
      participants: 5,
      timeLeft: "8 jours",
    },
  ]

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    // Initialize component
  }
}
