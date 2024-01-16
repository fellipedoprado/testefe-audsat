import { createReducer, on } from '@ngrx/store';
import { deletePost, deletePostError, deletePostSuccess, filterUsers, filterUsersError, filterUsersSuccess, loadComments, loadCommentsError, loadCommentsSuccess, loadPosts, loadPostsError, loadPostsSuccess, loadUsers, loadUsersError, loadUsersSuccess } from './state.actions';
import { State } from './index';
import { Post } from '../core/interfaces/post';

export const initialState: State = {
  users: [],
  posts: [],
  comments: []
};

export const StateReducer = createReducer(
  initialState,
  /* Carregar Usuários */
  on(loadUsers, (state: State) => {
    return state;
  }),
  on(loadUsersSuccess, (state: State, { users }) => {
    return { ...state, users: users }
  }),
  on(loadUsersError, (state: State, { error }) => {
    return state;
  }),
  /* Carregar Posts */
  on(loadPosts, (state: State, { userId }) => {
    return state;
  }),
  on(loadPostsSuccess, (state: State, { posts }) => {
    return { ...state, posts: posts }
  }),
  on(loadPostsError, (state: State, { error }) => {
    return state;
  }),
  /* Carregar Comentarios de um Post */
  on(loadComments, (state: State, { postId }) => {
    return state;
  }),
  on(loadCommentsSuccess, (state: State, { comments }) => {
    return { ...state, comments: comments }
  }),
  on(loadCommentsError, (state: State, { error }) => {
    return state;
  }),
  /* Deletar Post */
  on(deletePost, (state: State, { postId }) => {
    return state;
  }),
  on(deletePostSuccess, (state: State, { postId }) => {
    const newPosts: Post[] = state.posts.filter((p: Post) => {
      return p.id !== postId
    });
    return { ...state, posts: newPosts, comments: [] };
  }),
  on(deletePostError, (state: State, { error }) => {
    return state;
  }),
  /* Filtrar Usuários */
  on(filterUsers, (state: State, { filters }) => {
    return state;
  }),
  on(filterUsersSuccess, (state: State, { users }) => {
    return { ...state, users: users }
  }),
  on(filterUsersError, (state: State, { error }) => {
    return state;
  })
);
