import { GameComponent } from './game/game.component';
import { ChoosePieceComponent } from './choose-piece/choose-piece.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'choose', pathMatch: 'full' },
    { path: 'choose', component: ChoosePieceComponent },
    { path: 'game/:marker/:players', component: GameComponent }
];