import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoveryContainerComponent } from './features/discovery/components/discovery-container/discovery-container.component';

const routes: Routes = [
  {
    path: 'discovery',
    component: DiscoveryContainerComponent,
  },
  {
    path: '',
    redirectTo: 'discovery',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
