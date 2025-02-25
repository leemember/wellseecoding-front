import axios from 'axios'
import { all, call, fork, takeLatest, put } from 'redux-saga/effects'
import {
  AcceptMemberRequest,
  ACCEPT_MEMBER_FAILURE,
  ACCEPT_MEMBER_REQUEST,
  ACCEPT_MEMBER_SUCCESS,
  DeletePostRequest,
  DELETE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  FetchingPostRequest,
  FETCHING_POSTS_FAILURE,
  FETCHING_POSTS_REQUEST,
  FETCHING_POSTS_SUCCESS,
  FETCHING_POST_FAILURE,
  FETCHING_POST_REQUEST,
  FETCHING_POST_SUCCESS,
  FetchMembersRequest,
  FETCH_MEMBERS_FAILURE,
  FETCH_MEMBERS_REQUEST,
  FETCH_MEMBERS_SUCCESS,
  SearchPostsRequest,
  SEARCH_POSTS_FAILURE,
  SEARCH_POSTS_REQUEST,
  SEARCH_POSTS_SUCCESS,
  UpdatePostRequest,
  UPDATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  WritePostRequest,
  WRITE_POST_FAILURE,
  WRITE_POST_REQUEST,
  WRITE_POST_SUCCESS,
} from 'src/reducers/posts'
import { MemberData, PostType, WritePostType } from 'src/types'

async function fetchPostsAPI() {
  try {
    const result = await axios.get('/api/v1/posts')

    return result.data
  } catch (err) {
    console.error(err)
  }
}

function* fetchPosts() {
  try {
    const result: PostType = yield call(fetchPostsAPI)
    yield put({
      type: FETCHING_POSTS_SUCCESS,
      data: result,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: FETCHING_POSTS_FAILURE,
      data: err,
    })
  }
}

async function fetchPostAPI(data: number) {
  try {
    const result = await axios.get(`/api/v1/posts/${data}`)

    return result.data
  } catch (err) {
    console.error(err)
  }
}

function* fetchPost(action: FetchingPostRequest) {
  try {
    const result: PostType = yield call(fetchPostAPI, action.data)
    yield put({
      type: FETCHING_POST_SUCCESS,
      data: result,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: FETCHING_POST_FAILURE,
      data: err,
    })
  }
}

async function writePostAPI(data: WritePostType) {
  try {
    const response = await axios.post('/api/v1/posts', data)
    return response.status
  } catch (err) {
    console.error(err)
  }
}

function* writePost(action: WritePostRequest) {
  try {
    const result: number = yield call(writePostAPI, action.data)
    if (result === 200) {
      yield put({
        type: WRITE_POST_SUCCESS,
      })
    } else {
      throw 'Error'
    }
  } catch (err) {
    console.error(err)
    yield put({
      type: WRITE_POST_FAILURE,
      data: err,
    })
  }
}

async function updatePostAPI(data: WritePostType) {
  try {
    const response = await axios.put(`/api/v1/posts/${data.id}`, data)
    return response.status
  } catch (err) {
    console.error(err)
  }
}

function* updatePost(action: UpdatePostRequest) {
  try {
    const result: number = yield call(updatePostAPI, action.data)
    if (result === 200) {
      yield put({
        type: UPDATE_POST_SUCCESS,
      })
    }
    if (result === 401) {
      throw '401 Unathorized '
    } else {
      throw ' Error'
    }
  } catch (err) {
    console.error(err)
    yield put({
      type: UPDATE_POST_FAILURE,
      data: err,
    })
  }
}

async function deletePostAPI(data: number) {
  try {
    const response = await axios.delete(`/api/v1/posts/${data}`)
    return response.status
  } catch (err) {
    console.error(err)
  }
}

function* deletePost(action: DeletePostRequest) {
  try {
    const result: number = yield call(deletePostAPI, action.data)
    if (result === 200) {
      yield put({
        type: DELETE_POST_SUCCESS,
        data: action.data,
      })
    } else {
      throw 'Interner Server Error!'
    }
  } catch (err) {
    console.error(err)
    yield put({
      type: DELETE_POST_FAILURE,
      error: err,
    })
  }
}

async function searchPostsAPI(data: string) {
  try {
    const result = await axios.get(`/api/v1/posts?keyword=${data}`)
    return result.data
  } catch (err) {
    console.error(err)
  }
}

function* searchPosts(action: SearchPostsRequest) {
  try {
    const result: PostType[] = yield call(searchPostsAPI, action.data)
    yield put({
      type: SEARCH_POSTS_SUCCESS,
      data: result,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: SEARCH_POSTS_FAILURE,
      data: err,
    })
  }
}

async function fetchMembersAPI(data: number) {
  try {
    const result = await axios.get(`/api/v1/posts/${data}/members`)
    return result.data.members
  } catch (err) {
    console.error(err)
  }
}

function* fetchMembers(action: FetchMembersRequest) {
  try {
    const result: MemberData[] = yield call(fetchMembersAPI, action.data)
    yield put({
      type: FETCH_MEMBERS_SUCCESS,
      data: result,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: FETCH_MEMBERS_FAILURE,
      data: err,
    })
  }
}

async function acceptMemberAPI(data: { id: number; userId: number }) {
  try {
    await axios.put(`api/v1/posts/${data.id}/members/${data.userId}`, {})
  } catch (err) {
    console.error(err)
  }
}

function* acceptMember(action: AcceptMemberRequest) {
  try {
    yield call(acceptMemberAPI, action.data)
    yield put({
      type: ACCEPT_MEMBER_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: ACCEPT_MEMBER_FAILURE,
      data: err,
    })
  }
}

function* watchFetchPosts() {
  yield takeLatest(FETCHING_POSTS_REQUEST, fetchPosts)
}

function* watchFetchPost() {
  yield takeLatest(FETCHING_POST_REQUEST, fetchPost)
}

function* watchWritePost() {
  yield takeLatest(WRITE_POST_REQUEST, writePost)
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost)
}

function* watchDeletePost() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost)
}

function* watchSearchPosts() {
  yield takeLatest(SEARCH_POSTS_REQUEST, searchPosts)
}

function* watchFetchMembers() {
  yield takeLatest(FETCH_MEMBERS_REQUEST, fetchMembers)
}

function* watchAcceptMember() {
  yield takeLatest(ACCEPT_MEMBER_REQUEST, acceptMember)
}

export default function* postSaga() {
  yield all([
    fork(watchFetchPosts),
    fork(watchWritePost),
    fork(watchUpdatePost),
    fork(watchFetchPost),
    fork(watchDeletePost),
    fork(watchSearchPosts),
    fork(watchFetchMembers),
    fork(watchAcceptMember),
  ])
}
