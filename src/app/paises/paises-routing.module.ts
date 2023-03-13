import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesSelectorsComponent } from './pages/paises-selectors/paises-selectors.component';
const routes: Routes = [
{
path:'',
children:[
{path: 'selector', component: PaisesSelectorsComponent},
{path: '**', redirectTo: 'selector'}
]
}
];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PaisesRoutingModule { }
