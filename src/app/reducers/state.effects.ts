import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../core/service/users.service";
import { PostsService } from "../core/service/posts.service";
import { deletePost, deletePostError, deletePostSuccess, filterUsers, filterUsersError, filterUsersSuccess, loadComments, loadCommentsError, loadCommentsSuccess, loadPosts, loadPostsError, loadPostsSuccess, loadUsers, loadUsersError, loadUsersSuccess } from "./state.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { User } from "../core/interfaces/user";
import { Post } from "../core/interfaces/post";
import { Comment } from "../core/interfaces/comment";

@Injectable()
export class StateEffects {
    constructor(
        private actions: Actions,
        private usersService: UsersService,
        private postsService: PostsService
    ) { }

    loadUsers = createEffect(() =>
        this.actions.pipe(
            ofType(loadUsers),
            mergeMap(() =>
                this.usersService.getAllUsers().pipe(
                    map((res: User[]) => loadUsersSuccess({ users: res })),
                    catchError((error) => of(loadUsersError({ error })))
                )
            )
        )
    )

    loadPosts = createEffect(() =>
        this.actions.pipe(
            ofType(loadPosts),
            mergeMap((props) =>
                this.postsService.getPostsByUser(props.userId).pipe(
                    map((res: Post[]) => loadPostsSuccess({ posts: res })),
                    catchError((error) => of(loadPostsError({ error })))
                )
            )
        )
    )

    loadComments = createEffect(() =>
        this.actions.pipe(
            ofType(loadComments),
            mergeMap((props) =>
                this.postsService.getCommentsByPost(props.postId).pipe(
                    map((res: Comment[]) => loadCommentsSuccess({ comments: res })),
                    catchError((error) => of(loadCommentsError({ error })))
                )
            )
        )
    )

    deletePost = createEffect(() =>
        this.actions.pipe(
            ofType(deletePost),
            mergeMap((props) =>
                this.postsService.deletePost(props.postId).pipe(
                    map(() => deletePostSuccess({ postId: props.postId })),
                    catchError((error) => of(deletePostError({ error })))
                )
            )
        )
    )

    filterUsers = createEffect(() =>
        this.actions.pipe(
            ofType(filterUsers),
            mergeMap((props) =>
                this.usersService.filterUsers(props.filters).pipe(
                    map((res: User[]) => filterUsersSuccess({ users: res })),
                    catchError((error) => of(filterUsersError({ error })))
                )
            )
        )
    )
}
