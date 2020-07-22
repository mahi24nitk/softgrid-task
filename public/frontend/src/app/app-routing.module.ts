import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NdashboardComponent } from './ndashboard/ndashboard.component'

const routes: Routes = [
{
	path: 'dashboard',
	component: NdashboardComponent
},
{
	path: '',
	redirectTo: '/dashboard',
	pathMatch: 'full'
},
{
	path: '**',
	redirectTo: '/dashboard',
	pathMatch: 'full'
}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
