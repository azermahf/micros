import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { HeaderComponent } from "../../components/header/header.component"

@Component({
  selector: "app-rewards",
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Mes Récompenses</h1>
          <p class="text-gray-600">Découvrez vos badges et votre progression.</p>
        </div>

        <!-- User Stats -->
        <div class="bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 text-white rounded-lg p-8 mb-8">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-6">
              <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span class="text-4xl">🏆</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold mb-2">Mes récompenses</h2>
                <p class="text-lg opacity-90">Niveau : Écologiste confirmé</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-4xl font-bold">475</div>
              <div class="opacity-90">points totaux</div>
            </div>
          </div>
        </div>

        <!-- Badges -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div *ngFor="let badge of badges" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center">
            <div class="text-4xl mb-4">{{ badge.icon }}</div>
            <h3 class="font-bold mb-2">{{ badge.name }}</h3>
            <p class="text-sm text-gray-600 mb-4">{{ badge.description }}</p>
            <div class="space-y-2">
              <span [class]="'inline-block px-2 py-1 rounded-full text-xs font-medium ' + badge.rarityColor">{{ badge.rarity }}</span>
              <div class="text-sm text-green-600 font-medium">✓ Obtenu le {{ badge.earnedDate }}</div>
              <div class="text-sm text-gray-500">+{{ badge.points }} points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./rewards.component.scss"],
})
export class RewardsComponent implements OnInit {
  badges = [
    {
      id: 1,
      name: "Premier pas",
      description: "Compléter son premier défi",
      icon: "🌱",
      rarity: "common",
      rarityColor: "bg-gray-100 text-gray-700",
      earnedDate: "15 jan 2024",
      points: 25,
    },
    {
      id: 2,
      name: "Guerrier hebdomadaire",
      description: "Compléter 5 défis en une semaine",
      icon: "⚔️",
      rarity: "rare",
      rarityColor: "bg-purple-100 text-purple-700",
      earnedDate: "22 jan 2024",
      points: 50,
    },
    {
      id: 3,
      name: "Maître écolo",
      description: "Compléter 10 défis écologiques",
      icon: "🌍",
      rarity: "epic",
      rarityColor: "bg-green-100 text-green-700",
      earnedDate: "1 fév 2024",
      points: 100,
    },
    {
      id: 4,
      name: "Inspirateur",
      description: "Inviter 5 collègues à rejoindre un défi",
      icon: "✨",
      rarity: "rare",
      rarityColor: "bg-blue-100 text-blue-700",
      earnedDate: "5 fév 2024",
      points: 75,
    },
  ]

  constructor() {}

  ngOnInit(): void {}
}
