import { Component, HostListener, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../reducers';
import { User } from '../../core/interfaces/user';
import { Post } from '../../core/interfaces/post';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { deletePost, loadComments } from '../../reducers/state.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Comment } from '../../core/interfaces/comment';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-history',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './post-history.component.html',
  styleUrl: './post-history.component.scss'
})
export class PostHistoryComponent implements OnInit {
  private store = inject(Store);
  state$?: Observable<State>;

  userId!: number;
  user!: User;
  posts: Post[] = [];
  comments: Comment[] = [];

  collapsedHeight = '60px';
  panelOpenState = false;
  message: string = 'Post excluído com sucesso';
  action: string = 'Fechar';

  constructor(
    private _activatedroute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.state$ = this.store.select('state');
  }

  ngOnInit(): void {
    this.userId = Number(this._activatedroute.snapshot.params['userId']);
    this.stateSubscription(this.userId);
  }

  private stateSubscription(userId: number): void {
    this.state$?.subscribe(res => {
      const tempUser = res.users.find((u: User) => userId === u.id);

      if (tempUser === undefined) {
        this._router.navigate(['']);
      } else {
        this.user = tempUser;
        this.posts = res.posts;
        this.comments = res.comments;
      }
    });
  }

  getComments(id: number): void {
    this.store.dispatch(loadComments({postId: id}));
  }
  
  openTitle(post: Post) {
    this.panelOpenState = true;
    this.getComments(post.id);
  }

  closeTitle(): void {
    this.panelOpenState = false;
  }

  deletePost(post: Post): void {
    this.store.dispatch(deletePost({postId: post.id}));
    this.openSnackBar(this.message, this.action);
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (window.innerWidth < 1700) {
      this.collapsedHeight = '200px';
    } else {
      this.collapsedHeight = '60px'
    }
  }

}
