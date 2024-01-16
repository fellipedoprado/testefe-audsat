import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { User } from '../core/interfaces/user';
import { Post } from '../core/interfaces/post';
import { Comment } from '../core/interfaces/comment';
import { StateReducer } from './state.reducer';

export interface State {
  users: User[];
  posts: Post[],
  comments: Comment[]
}

export const reducers: ActionReducerMap<{state: State}> = {
  state: StateReducer
};

export const metaReducers: MetaReducer<{state: State}>[] = isDevMode() ? [] : [];

