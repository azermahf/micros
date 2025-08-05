import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { HeaderComponent } from "../../components/header/header.component"
import type { Challenge } from "../../models/challenge.interface"

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 mb-6">
          <a routerLink="/dashboard" class="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            ← Retour au tableau de bord
          </a>
        </div>

        <!-- Page Header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Calendrier des défis</h1>
            <p class="text-gray-600">Visualisez tous les défis planifiés et organisez votre participation.</p>
          </div>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            ➕ Nouveau défi
          </button>
        </div>

        <!-- Controls -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <div class="flex items-center gap-4">
            <select [(ngModel)]="categoryFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
              <option value="all">Toutes les catégories</option>
              <option value="ecological">Écologique</option>
              <option value="solidarity">Solidaire</option>
              <option value="creative">Créatif</option>
            </select>

            <div class="flex items-center gap-2">
              <button
                [class]="'px-3 py-2 rounded text-sm ' + (viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700')"
                (click)="viewMode = 'month'"
              >
                Mois
              </button>
              <button
                [class]="'px-3 py-2 rounded text-sm ' + (viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700')"
                (click)="viewMode = 'week'"
              >
                Semaine
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Calendar -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold flex items-center gap-2">
                  📅 {{ monthNames[currentDate.getMonth()] }} {{ currentDate.getFullYear() }}
                </h2>
                <div class="flex items-center gap-2">
                  <button (click)="navigateMonth('prev')" class="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded">
                    ←
                  </button>
                  <button (click)="goToToday()" class="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded">
                    Aujourd'hui
                  </button>
                  <button (click)="navigateMonth('next')" class="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded">
                    →
                  </button>
                </div>
              </div>

              <!-- Calendar Grid -->
              <div class="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
                <!-- Day Headers -->
                <div *ngFor="let day of dayNames" class="bg-gray-100 p-2 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                  {{ day }}
                </div>

                <!-- Calendar Days -->
                <div *ngFor="let day of calendarDays" [class]="'h-24 border border-gray-200 p-1 ' + (day.isToday ? 'bg-blue-50' : 'bg-white')">
                  <div [class]="'text-sm font-medium mb-1 ' + (day.isToday ? 'text-blue-600' : 'text-gray-900')">
                    {{ day.date }}
                  </div>
                  <div class="space-y-1">
                    <div *ngFor="let challenge of day.challenges.slice(0, 2)" 
                         [class]="'text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 ' + challenge.categoryColor"
                         [title]="challenge.title">
                      <div class="flex items-center gap-1">
                        <span>{{ challenge.categoryIcon }}</span>
                        <span class="truncate">{{ challenge.title }}</span>
                      </div>
                    </div>
                    <div *ngIf="day.challenges.length > 2" class="text-xs text-gray-500">
                      +{{ day.challenges.length - 2 }} autres
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Calendar Placeholder -->
            <div class="bg-white rounded-lg shadow-md p-8 text-center">
              <div class="text-6xl mb-4">📅</div>
              <h2 class="text-2xl font-bold mb-4">Calendrier des défis</h2>
              <p class="text-gray-600 mb-6">Le calendrier interactif sera bientôt disponible pour organiser vos défis.</p>
              
              <!-- Upcoming Challenges -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div *ngFor="let challenge of upcomingChallenges" class="bg-gray-50 rounded-lg p-4">
                  <div class="flex items-center gap-2 mb-2">
                    <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + challenge.categoryColor">
                      <span class="mr-1">{{ challenge.categoryIcon }}</span>
                      {{ challenge.category }}
                    </span>
                  </div>
                  <h4 class="font-medium text-sm mb-1">{{ challenge.title }}</h4>
                  <div class="text-xs text-gray-600">{{ challenge.date }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  currentDate = new Date(2024, 1, 1) // February 2024
  viewMode: "month" | "week" = "month"
  categoryFilter = "all"

  monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  calendarDays: any[] = []

  challenges: Challenge[] = [
    {
      id: 1,
      title: "Défi zéro déchet",
      description: "Réduire ses déchets pendant une semaine",
      category: "Écologique",
      categoryColor: "bg-green-100 text-green-700",
      categoryIcon: "🌱",
      startDate: new Date(2024, 1, 20),
      endDate: new Date(2024, 1, 27),
      participants: 8,
      status: "En cours",
    },
    {
      id: 2,
      title: "Mur d'expression créatif",
      description: "Créer un mur d'expression pour l'équipe",
      category: "Créatif",
      categoryColor: "bg-yellow-100 text-yellow-700",
      categoryIcon: "🎨",
      startDate: new Date(2024, 1, 25),
      endDate: new Date(2024, 2, 1),
      participants: 5,
      status: "En cours",
    },
    {
      id: 3,
      title: "Atelier cuisine collaborative",
      description: "Organiser un atelier cuisine",
      category: "Solidaire",
      categoryColor: "bg-pink-100 text-pink-700",
      categoryIcon: "❤️",
      startDate: new Date(2024, 2, 5),
      endDate: new Date(2024, 2, 12),
      participants: 0,
      status: "À venir",
    },
  ]

  activeChallenges: Challenge[] = []
  upcomingChallenges = [
    {
      id: 1,
      title: "Atelier cuisine collaborative",
      category: "Solidaire",
      categoryColor: "bg-pink-100 text-pink-700",
      categoryIcon: "❤️",
      date: "5 Fév 2024",
    },
    {
      id: 2,
      title: "Défi mobilité douce",
      category: "Écologique",
      categoryColor: "bg-green-100 text-green-700",
      categoryIcon: "🌱",
      date: "10 Fév 2024",
    },
    {
      id: 3,
      title: "Podcast d'équipe",
      category: "Créatif",
      categoryColor: "bg-yellow-100 text-yellow-700",
      categoryIcon: "🎨",
      date: "15 Fév 2024",
    },
  ]

  constructor() {}

  ngOnInit(): void {
    this.generateCalendarDays()
    this.loadChallenges()
  }

  generateCalendarDays(): void {
    const year = this.currentDate.getFullYear()
    const month = this.currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    const today = new Date()

    this.calendarDays = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push({ date: "", challenges: [], isEmpty: true })
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = today.toDateString() === date.toDateString()
      const dayChallenges = this.getChallengesForDate(date)

      this.calendarDays.push({
        date: day,
        fullDate: date,
        challenges: dayChallenges,
        isToday,
        isEmpty: false,
      })
    }
  }

  getChallengesForDate(date: Date): Challenge[] {
    return this.challenges.filter((challenge) => {
      const challengeStart = new Date(challenge.startDate)
      const challengeEnd = new Date(challenge.endDate)
      return date >= challengeStart && date <= challengeEnd
    })
  }

  navigateMonth(direction: "prev" | "next"): void {
    const newDate = new Date(this.currentDate)
    if (direction === "prev") {
      newDate.setMonth(this.currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(this.currentDate.getMonth() + 1)
    }
    this.currentDate = newDate
    this.generateCalendarDays()
  }

  goToToday(): void {
    this.currentDate = new Date()
    this.generateCalendarDays()
  }

  loadChallenges(): void {
    this.activeChallenges = this.challenges.filter((c) => c.status === "En cours")
    this.upcomingChallenges = this.challenges.filter((c) => c.status === "À venir")
  }
}
