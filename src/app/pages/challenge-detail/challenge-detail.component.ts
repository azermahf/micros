import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, type ActivatedRoute } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { HeaderComponent } from "../../components/header/header.component"
import type { ChallengeService } from "../../services/challenge.service"
import type { Challenge } from "../../models/challenge.interface"

@Component({
  selector: "app-challenge-detail",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" *ngIf="challenge">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 mb-6">
          <a routerLink="/dashboard" class="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            ← Retour aux défis
          </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Challenge Header -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-3">
                    <span [class]="'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ' + challenge.categoryColor">
                      <span class="mr-1">{{ challenge.categoryIcon }}</span>
                      {{ challenge.category }}
                    </span>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      🕒 {{ challenge.timeLeft }}
                    </span>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                      🏆 {{ challenge.points }} points
                    </span>
                  </div>
                  <h1 class="text-2xl font-bold mb-2">{{ challenge.title }}</h1>
                  <p class="text-gray-600">{{ challenge.description }}</p>
                </div>
                <div class="flex gap-2">
                  <button class="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded">
                    📤
                  </button>
                  <button class="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded">
                    ❤️
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="text-center">
                  <div class="text-gray-500 mb-1">📅</div>
                  <div class="text-sm font-medium">Début</div>
                  <div class="text-xs text-gray-600">{{ challenge.startDate | date:'dd MMM yyyy' }}</div>
                </div>
                <div class="text-center">
                  <div class="text-gray-500 mb-1">📅</div>
                  <div class="text-sm font-medium">Fin</div>
                  <div class="text-xs text-gray-600">{{ challenge.endDate | date:'dd MMM yyyy' }}</div>
                </div>
                <div class="text-center">
                  <div class="text-gray-500 mb-1">👥</div>
                  <div class="text-sm font-medium">Participants</div>
                  <div class="text-xs text-gray-600">{{ challenge.participants }}</div>
                </div>
                <div class="text-center">
                  <div class="text-gray-500 mb-1">🎯</div>
                  <div class="text-sm font-medium">Difficulté</div>
                  <div class="text-xs text-gray-600">{{ challenge.difficulty }}</div>
                </div>
              </div>

              <div *ngIf="challenge.progress" class="mb-6">
                <div class="flex justify-between text-sm mb-2">
                  <span>Progression globale</span>
                  <span>{{ challenge.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-blue-600 h-3 rounded-full transition-all duration-300" [style.width.%]="challenge.progress"></div>
                </div>
              </div>

              <div class="flex gap-3">
                <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                  Continuer le défi
                </button>
                <button class="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg">
                  Inviter des collègues
                </button>
              </div>
            </div>

            <!-- Challenge Details -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-xl font-bold mb-4">Description détaillée</h2>
              <div class="prose prose-sm max-w-none">
                <p class="whitespace-pre-line">{{ challenge.longDescription }}</p>
              </div>

              <div *ngIf="challenge.organizer" class="mt-6 p-4 bg-blue-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div>
                    <div class="font-medium">{{ challenge.organizer.name }}</div>
                    <div class="text-sm text-gray-600">{{ challenge.organizer.role }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Participants -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                👥 Participants ({{ challenge.participants }})
              </h3>
              <div class="space-y-3">
                <div *ngFor="let participant of participants" class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-medium">{{ participant.name }}</div>
                    <div class="flex items-center gap-2">
                      <div class="flex-1 bg-gray-200 rounded-full h-1">
                        <div class="bg-blue-600 h-1 rounded-full" [style.width.%]="participant.progress"></div>
                      </div>
                      <span class="text-xs text-gray-500">{{ participant.progress }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="bg-white rounded-lg shadow-md p-6">
              <h3 class="text-lg font-bold mb-4">Statistiques</h3>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Temps estimé</span>
                  <span class="text-sm font-medium">{{ challenge.estimatedTime }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Points à gagner</span>
                  <span class="text-sm font-medium">{{ challenge.points }} pts</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Difficulté</span>
                  <span class="text-sm font-medium">{{ challenge.difficulty }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./challenge-detail.component.scss"],
})
export class ChallengeDetailComponent implements OnInit {
  challenge: Challenge | undefined

  participants = [
    { name: "Alice Martin", progress: 80 },
    { name: "Thomas Leroy", progress: 60 },
    { name: "Sophie Chen", progress: 90 },
    { name: "Lucas Bernard", progress: 45 },
    { name: "Emma Rousseau", progress: 70 },
  ]

  constructor(
    private route: ActivatedRoute,
    private challengeService: ChallengeService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.challengeService.getChallengeById(id).subscribe((challenge) => {
      this.challenge = challenge
    })
  }
}
