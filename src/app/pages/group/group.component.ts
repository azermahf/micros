import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { HeaderComponent } from "../../components/header/header.component"

@Component({
  selector: "app-group",
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <app-header></app-header>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Mon Groupe</h1>
          <p class="text-gray-600">Collaborez avec votre équipe sur les défis en cours.</p>
        </div>

        <!-- Group Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-md p-4 text-center">
            <div class="text-2xl mb-2">👥</div>
            <div class="text-2xl font-bold">12</div>
            <div class="text-sm text-gray-600">Membres</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-4 text-center">
            <div class="text-2xl mb-2">🏆</div>
            <div class="text-2xl font-bold">1250</div>
            <div class="text-sm text-gray-600">Points totaux</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-4 text-center">
            <div class="text-2xl mb-2">🎯</div>
            <div class="text-2xl font-bold">8</div>
            <div class="text-sm text-gray-600">Défis complétés</div>
          </div>
          <div class="bg-white rounded-lg shadow-md p-4 text-center">
            <div class="text-2xl mb-2">📅</div>
            <div class="text-2xl font-bold">3</div>
            <div class="text-sm text-gray-600">Semaines consécutives</div>
          </div>
        </div>

        <!-- Group Content -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold mb-4">Équipe Innovation Durable</h2>
          <p class="text-gray-600 mb-6">Notre groupe se concentre sur les défis écologiques et d'innovation durable</p>
          
          <div class="space-y-4">
            <div *ngFor="let member of members" class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                👤
              </div>
              <div class="flex-1">
                <div class="font-medium">{{ member.name }}</div>
                <div class="text-sm text-gray-600">{{ member.role }}</div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium">{{ member.points }} pts</div>
                <div class="text-xs text-gray-500">{{ member.badges }} badges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./group.component.scss"],
})
export class GroupComponent implements OnInit {
  activeTab = "chat"
  newMessage = ""

  tabs = [
    { id: "chat", label: "Chat" },
    { id: "polls", label: "Sondages" },
    { id: "gallery", label: "Galerie" },
  ]

  groupInfo = {
    name: "Équipe Innovation Durable",
    description: "Notre groupe se concentre sur les défis écologiques et d'innovation durable",
    members: 12,
    totalPoints: 1250,
    completedChallenges: 8,
    currentStreak: 3,
  }

  members = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Chef d'équipe",
      points: 320,
      badges: 5,
      status: "online",
    },
    {
      id: 2,
      name: "Thomas Leroy",
      role: "Développeur",
      points: 280,
      badges: 4,
      status: "online",
    },
    {
      id: 3,
      name: "Sophie Chen",
      role: "Designer",
      points: 295,
      badges: 6,
      status: "away",
    },
    {
      id: 4,
      name: "Lucas Bernard",
      role: "Marketing",
      points: 180,
      badges: 3,
      status: "offline",
    },
    {
      id: 5,
      name: "Emma Rousseau",
      role: "RH",
      points: 175,
      badges: 2,
      status: "online",
    },
  ]

  messages = [
    {
      id: 1,
      user: "Marie Dubois",
      message: "Félicitations à tous pour le défi zéro déchet ! Nous avons atteint 85% de participation 🎉",
      timestamp: "Il y a 10 minutes",
      likes: 5,
      type: "text",
    },
    {
      id: 2,
      user: "Thomas Leroy",
      message: "J'ai trouvé une super astuce pour réduire les déchets au bureau !",
      image: "/assets/images/messages/astuce-dechets.jpg",
      timestamp: "Il y a 25 minutes",
      likes: 3,
      type: "image",
    },
    {
      id: 3,
      user: "Sophie Chen",
      message: "Qui est partant pour organiser un atelier compostage la semaine prochaine ?",
      timestamp: "Il y a 1 heure",
      likes: 7,
      type: "text",
    },
  ]

  polls = [
    {
      id: 1,
      title: "Quel sera notre prochain défi ?",
      description: "Votez pour le défi que vous aimeriez relever ensemble",
      options: [
        { id: "a", text: "Défi mobilité douce (vélo, marche, transport en commun)", votes: 7 },
        { id: "b", text: "Atelier cuisine collaborative avec produits locaux", votes: 5 },
        { id: "c", text: "Création d'un jardin partagé sur la terrasse", votes: 9 },
        { id: "d", text: "Défi numérique responsable (réduction emails, etc.)", votes: 3 },
      ],
      totalVotes: 24,
      endsAt: "Dans 2 jours",
      hasVoted: false,
    },
  ]

  contributions = [
    {
      id: 1,
      user: "Thomas Leroy",
      type: "photo",
      title: "Mon setup zéro déchet au bureau",
      image: "/assets/images/gallery/setup-zero-dechet.jpg",
      likes: 12,
      comments: 3,
      timestamp: "Il y a 2 heures",
    },
    {
      id: 2,
      user: "Sophie Chen",
      type: "photo",
      title: "Résultat de ma semaine sans plastique",
      image: "/assets/images/gallery/sans-plastique.jpg",
      likes: 8,
      comments: 5,
      timestamp: "Il y a 1 jour",
    },
  ]

  constructor() {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (this.newMessage.trim()) {
      // Logic to send message
      this.newMessage = ""
    }
  }

  vote(pollId: number, optionId: string): void {
    // Logic to submit vote
    console.log(`Voted for option ${optionId} in poll ${pollId}`)
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }
}
