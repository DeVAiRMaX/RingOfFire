import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GamecomponentComponent } from './gamecomponent/gamecomponent.component';

export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'app-gamecomponent/:id', component: GamecomponentComponent },
];
