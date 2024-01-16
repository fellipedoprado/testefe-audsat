import { createAction, props } from '@ngrx/store';
import { User } from '../core/interfaces/user';
import { Post } from '../core/interfaces/post';
import { Comment } from '../core/interfaces/comment';
import { FilterBy } from '../core/interfaces/filter';

/* Carregar Usuários */
export const loadUsers = createAction('[Listings Feature] Load Users');
export const loadUsersSuccess = createAction(
    '[Listings Feature] Load Users Success',
    props<{ users: User[] }>()
);
export const loadUsersError = createAction(
    '[Listings Feature] Load Users Error',
    props<{ error: string }>()
);

/* Carregar Posts */
export const loadPosts = createAction(
    '[Post History Feature] Load Posts',
    props<{ userId: number }>()
);
export const loadPostsSuccess = createAction(
    '[Post History Feature] Load Posts Success',
    props<{ posts: Post[] }>()
);
export const loadPostsError = createAction(
    '[Post History Feature] Load Posts Error',
    props<{ error: string }>()
);

/* Carregar Comentarios de um Post */
export const loadComments = createAction(
    '[Post History Feature] Load Comments',
    props<{ postId: number }>()
);
export const loadCommentsSuccess = createAction(
    '[Post History Feature] Load Comments Success',
    props<{ comments: Comment[] }>()
);
export const loadCommentsError = createAction(
    '[Post History Feature] Load Comments Error',
    props<{ error: string }>()
);

/* Deletar Post */
export const deletePost = createAction(
    '[Post History Feature] Delete Post',
    props<{ postId: number }>()
);
export const deletePostSuccess = createAction(
    '[Post History Feature] Delete Post Success',
    props<{ postId: number }>()
);
export const deletePostError = createAction(
    '[Post History Feature] Delete Post Error',
    props<{ error: string }>()
);

/* Filtrar Usuários */
export const filterUsers = createAction(
    '[Post History Feature] Filter Users',
    props<{ filters: FilterBy[] }>()
);
export const filterUsersSuccess = createAction(
    '[Post History Feature] Filter Users Success',
    props<{ users: User[] }>()
);
export const filterUsersError = createAction(
    '[Post History Feature] Filter Users Error',
    props<{ error: string }>()
);