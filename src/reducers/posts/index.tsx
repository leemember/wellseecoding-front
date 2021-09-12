import produce from 'immer'
import { PostType, WritePostType } from 'types'

// initialState 타입 정의
export interface PostsIntialState {
  posts: PostType[]

  fetchPostsLoading: boolean
  fetchPostsSuccess: boolean
  fetchPostsFailure: null | Error

  writePostsLoading: boolean
  writePostsSuccess: boolean
  writePostsFailure: null | Error
}

// initialState 정의
export const initialState: PostsIntialState = {
  posts: [],

  fetchPostsLoading: false,
  fetchPostsSuccess: false,
  fetchPostsFailure: null,

  writePostsLoading: false,
  writePostsSuccess: false,
  writePostsFailure: null,
}

// 액션 정의
export const FETCHING_POSTS_REQUEST = 'FETCHING_POSTS_REQUEST' as const
export const FETCHING_POSTS_SUCCESS = 'FETCHING_POSTS_SUCCESS' as const
export const FETCHING_POSTS_FAILURE = 'FETCHING_POSTS_FAILURE' as const

export const WRITE_POST_REQUEST = 'WRITE_POST_REQUEST' as const
export const WRITE_POST_SUCCESS = 'WRITE_POST_SUCCESS' as const
export const WRITE_POST_FAILURE = 'WRITE_POST_FAILURE' as const

// 액션에 대한 타입 정의;
export interface FetchingPostsRequest {
  type: typeof FETCHING_POSTS_REQUEST
}

export interface FetchingPostsSuccess {
  type: typeof FETCHING_POSTS_SUCCESS
  posts: PostType
  data: []
}

export interface FetchingPostsFailure {
  type: typeof FETCHING_POSTS_FAILURE
  error: Error
}

export interface WritePostRequest {
  type: typeof WRITE_POST_REQUEST
  data: WritePostType
}

export interface WritePostSuccess {
  type: typeof WRITE_POST_SUCCESS
}

export interface WritePostFailure {
  type: typeof WRITE_POST_FAILURE
  error: Error
}

// 리듀서 안에 들어갈 액션 타입에 대한 액션 생성 함수 정의

export const fetchingPostsRequest = (): FetchingPostsRequest => ({
  type: FETCHING_POSTS_REQUEST,
})

export const fetchingPostsSuccess = (posts: PostType, data: []): FetchingPostsSuccess => ({
  type: FETCHING_POSTS_SUCCESS,
  posts,
  data,
})

export const fetchingPostsFailure = (error: Error): FetchingPostsFailure => ({
  type: FETCHING_POSTS_FAILURE,
  error,
})

export const writePostRequest = (data: WritePostType): WritePostRequest => ({
  type: WRITE_POST_REQUEST,
  data,
})

export const writePostSuccess = (): WritePostSuccess => ({
  type: WRITE_POST_SUCCESS,
})

export const writePostFailure = (error: Error): WritePostFailure => ({
  type: WRITE_POST_FAILURE,
  error,
})

export type FetchingPosts =
  | ReturnType<typeof fetchingPostsRequest>
  | ReturnType<typeof fetchingPostsSuccess>
  | ReturnType<typeof fetchingPostsFailure>
  | ReturnType<typeof writePostRequest>
  | ReturnType<typeof writePostSuccess>
  | ReturnType<typeof writePostFailure>

const posts = (state: PostsIntialState = initialState, action: FetchingPosts) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCHING_POSTS_REQUEST: {
        draft.fetchPostsLoading = true
        draft.fetchPostsSuccess = false
        break
      }
      case FETCHING_POSTS_SUCCESS: {
        draft.fetchPostsLoading = false
        draft.fetchPostsSuccess = true
        draft.posts = draft.posts.concat(action.data)
        break
      }
      case FETCHING_POSTS_FAILURE: {
        draft.fetchPostsSuccess = false
        draft.fetchPostsFailure = action.error
        break
      }
      case WRITE_POST_REQUEST: {
        draft.fetchPostsLoading = true
        draft.fetchPostsSuccess = false
        break
      }
      case WRITE_POST_SUCCESS: {
        draft.fetchPostsLoading = false
        draft.fetchPostsSuccess = true
        break
      }
      case WRITE_POST_FAILURE: {
        draft.fetchPostsSuccess = false
        draft.fetchPostsFailure = action.error
        break
      }
      default:
        return state
    }
  })

export default posts
