import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">MC</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Micro-Challenges</h1>
              <p class="text-sm text-gray-500">Positive innovation</p>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="flex-1 max-w-lg mx-8">
            <input
              type="search"
              placeholder="Rechercher un défi..."
              [(ngModel)]="searchQuery"
              class="w-full px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            >
          </div>

          <!-- Navigation -->
          <nav class="flex items-center space-x-6">
            <a routerLink="/" routerLinkActive="text-blue-600 font-medium border-b-2 border-blue-600 pb-1" [routerLinkActiveOptions]="{exact: true}" class="text-gray-600 hover:text-gray-900">
              Accueil
            </a>
            <a routerLink="/dashboard" routerLinkActive="text-blue-600 font-medium border-b-2 border-blue-600 pb-1" class="text-gray-600 hover:text-gray-900">
              Mes Défis
            </a>
            <a routerLink="/calendar" routerLinkActive="text-blue-600 font-medium border-b-2 border-blue-600 pb-1" class="text-gray-600 hover:text-gray-900">
              Calendrier
            </a>
            <a routerLink="/group" routerLinkActive="text-blue-600 font-medium border-b-2 border-blue-600 pb-1" class="text-gray-600 hover:text-gray-900">
              Mon Groupe
            </a>
            <a routerLink="/rewards" routerLinkActive="text-blue-600 font-medium border-b-2 border-blue-600 pb-1" class="text-gray-600 hover:text-gray-900">
              Récompenses
            </a>
            
            <!-- Notifications -->
            <div class="relative">
              <button class="relative p-2 text-gray-600 hover:text-gray-900">
                🔔
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            
            <!-- User Menu -->
            <button class="p-2 text-gray-600 hover:text-gray-900">
              👤
            </button>
          </nav>
        </div>
      </div>
    </header>
  `,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  searchQuery = ""
}
