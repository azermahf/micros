import { bootstrapApplication } from "@angular/platform-browser"
import { provideRouter } from "@angular/router"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { importProvidersFrom } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"

import { AppComponent } from "./app/app.component"
import { routes } from "./app/app.routes"

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(HttpClientModule)],
}).catch((err) => console.error(err))
