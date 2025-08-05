import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { HeaderComponent } from "../../components/header/header.component"
import type { ChallengeService } from "../../services/challenge.service"
import type { Challenge } from "../../models/challenge.interface"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 mb-6">
          <a routerLink="/" class="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            ← Retour au tableau de bord
          </a>
        </div>

        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Tableau de bord des défis</h1>
          <p class="text-gray-600">Gérez vos défis en cours et découvrez de nouveaux challenges à relever.</p>
        </div>

        <!-- Filters and Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="flex-1">
            <input
              type="search"
              placeholder="Rechercher un défi..."
              [(ngModel)]="searchQuery"
              class="max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
          </div>

          <div class="flex items-center gap-4">
            <select [(ngModel)]="categoryFilter" class="px-4 py-2 bg-yellow-400 border border-yellow-500 rounded-lg focus:outline-none focus:border-yellow-600">
              <option value="all">Toutes les catégories</option>
              <option value="ecological">Écologique</option>
              <option value="solidarity">Solidaire</option>
              <option value="creative">Créatif</option>
            </select>

            <div class="flex items-center gap-2">
              <button
                [class]="'px-3 py-2 rounded text-sm ' + (viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700')"
                (click)="viewMode = 'grid'"
              >
                📊
              </button>
              <button
                [class]="'px-3 py-2 rounded text-sm ' + (viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700')"
                (click)="viewMode = 'list'"
              >
                📋
              </button>
            </div>

            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              ➕ Proposer un défi
            </button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="mb-6">
          <div class="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
            <button
              *ngFor="let tab of tabs"
              [class]="'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ' + (activeTab === tab.id ? 'bg-yellow-400 text-black' : 'text-gray-600 hover:text-gray-900')"
              (click)="activeTab = tab.id"
            >
              {{ tab.label }}
              <span class="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">{{ tab.count }}</span>
            </button>
          </div>
        </div>

        <!-- Challenge Content -->
        <div [ngSwitch]="activeTab">
          <!-- Active Challenges -->
          <div *ngSwitchCase="'active'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Vos défis actifs</h2>
              <span class="text-sm text-gray-600">{{ activeChallenges.length }} défis en cours</span>
            </div>

            <div [class]="'grid gap-6 ' + (viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1')">
              <div *ngFor="let challenge of activeChallenges" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + challenge.categoryColor">
                        <span class="mr-1">{{ challenge.categoryIcon }}</span>
                        {{ challenge.category }}
                      </span>
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        🕒 {{ challenge.timeLeft }}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold mb-2">{{ challenge.title }}</h3>
                    <p class="text-sm text-gray-600">{{ challenge.description }}</p>
                  </div>
                </div>

                <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div class="flex items-center gap-1">
                    📅 {{ challenge.startDate | date:'dd MMM' }} - {{ challenge.endDate | date:'dd MMM' }}
                  </div>
                  <div class="flex items-center gap-1">
                    👥 {{ challenge.participants }} participants
                  </div>
                </div>

                <div *ngIf="challenge.progress" class="mb-4">
                  <div class="flex justify-between text-sm mb-2">
                    <span>Progression</span>
                    <span>{{ challenge.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" [style.width.%]="challenge.progress"></div>
                  </div>
                </div>

                <div class="flex gap-2">
                  <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                    Continuer
                  </button>
                  <a [routerLink]="['/challenge', challenge.id]" class="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">
                    Détails
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Challenges -->
          <div *ngSwitchCase="'upcoming'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Défis à venir</h2>
              <span class="text-sm text-gray-600">{{ upcomingChallenges.length }} défis disponibles</span>
            </div>

            <div [class]="'grid gap-6 ' + (viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')">
              <div *ngFor="let challenge of upcomingChallenges" class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div class="flex items-center gap-2 mb-2">
                  <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + challenge.categoryColor">
                    <span class="mr-1">{{ challenge.categoryIcon }}</span>
                    {{ challenge.category }}
                  </span>
                </div>
                <h3 class="text-lg font-bold mb-2">{{ challenge.title }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ challenge.description }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div class="flex items-center gap-1">
                    📅 {{ challenge.startDate | date:'dd MMM' }} - {{ challenge.endDate | date:'dd MMM' }}
                  </div>
                  <div class="flex items-center gap-1">
                    👥 {{ challenge.participants }} participants
                  </div>
                </div>

                <div class="flex gap-2">
                  <button class="flex-1 bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg">
                    S'inscrire
                  </button>
                  <a [routerLink]="['/challenge', challenge.id]" class="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">
                    Détails
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Completed Challenges -->
          <div *ngSwitchCase="'completed'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Défis terminés</h2>
              <span class="text-sm text-gray-600">{{ completedChallenges.length }} défi complété</span>
            </div>

            <div [class]="'grid gap-6 ' + (viewMode === 'grid' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1')">
              <div *ngFor="let challenge of completedChallenges" class="bg-white rounded-lg shadow-md p-6">
                <div class="flex items-center gap-2 mb-2">
                  <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + challenge.categoryColor">
                    <span class="mr-1">{{ challenge.categoryIcon }}</span>
                    {{ challenge.category }}
                  </span>
                </div>
                <h3 class="text-lg font-bold mb-2">{{ challenge.title }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ challenge.description }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div class="flex items-center gap-1">
                    📅 {{ challenge.startDate | date:'dd MMM' }} - {{ challenge.endDate | date:'dd MMM' }}
                  </div>
                  <div class="flex items-center gap-1">
                    👥 {{ challenge.participants }} participants
                  </div>
                </div>

                <button class="w-full bg-transparent border border-gray-300 text-gray-500 py-2 px-4 rounded-lg" disabled>
                  Terminé ({{ challenge.points }} pts)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  searchQuery = ""
  categoryFilter = "all"
  viewMode: "grid" | "list" = "grid"
  activeTab = "active"

  tabs = [
    { id: "active", label: "En cours", count: 2 },
    { id: "upcoming", label: "À venir", count: 3 },
    { id: "completed", label: "Terminés", count: 1 },
  ]

  activeChallenges: Challenge[] = []
  upcomingChallenges: Challenge[] = []
  completedChallenges: Challenge[] = []

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.loadChallenges()
  }

  private loadChallenges(): void {
    this.challengeService.getActiveChallenges().subscribe((challenges) => {
      this.activeChallenges = challenges
    })

    // Mock upcoming challenges
    this.upcomingChallenges = [
      {
        id: 4,
        title: "Atelier cuisine collaborative",
        description: "Organisez un atelier de cuisine avec des ingrédients locaux et de saison.",
        category: "Solidaire",
        categoryColor: "bg-pink-100 text-pink-700",
        categoryIcon: "❤️",
        startDate: new Date(2024, 1, 5),
        endDate: new Date(2024, 1, 12),
        participants: 0,
        status: "À venir",
      },
      {
        id: 5,
        title: "Défi mobilité douce",
        description: "Utilisez uniquement des moyens de transport écologiques pendant une semaine.",
        category: "Écologique",
        categoryColor: "bg-green-100 text-green-700",
        categoryIcon: "🌱",
        startDate: new Date(2024, 1, 10),
        endDate: new Date(2024, 1, 17),
        participants: 2,
        status: "À venir",
      },
      {
        id: 6,
        title: "Création d'un podcast d'équipe",
        description: "Créez et enregistrez un épisode de podcast sur un sujet qui vous passionne.",
        category: "Créatif",
        categoryColor: "bg-yellow-100 text-yellow-700",
        categoryIcon: "🎨",
        startDate: new Date(2024, 1, 15),
        endDate: new Date(2024, 1, 22),
        participants: 1,
        status: "À venir",
      },
    ]

    this.challengeService.getCompletedChallenges().subscribe((challenges) => {
      this.completedChallenges = challenges
    })
  }
}
