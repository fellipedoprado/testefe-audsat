import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ListingsComponent } from './features/listings/listings.component';
import { PostHistoryComponent } from './features/post-history/post-history.component';
import { LogsComponent } from './features/logs/logs.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'listings',
        children: [
            { path: '', component: ListingsComponent },
            { path: 'post-history/:userId', component: PostHistoryComponent }
        ]
    },
    { path: 'logs', component: LogsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '*', redirectTo: 'home', pathMatch: 'full' },
];
