import { put } from '@redux-saga/core/effects'
import axios from 'axios'
import { all, call, fork, takeLatest } from 'redux-saga/effects'
import { API_URL } from 'apis'
import {
  FetchingTodosRequest,
  FETCHING_TODOS_FAILURE,
  FETCHING_TODOS_REQUEST,
  FETCHING_TODOS_SUCCESS,
} from 'reducers/todos'
import { TodoType } from 'types'

type resultType = {
  result: TodoType[]
}

async function fetchTodosAPI(data: { first: number; last: number }) {
  try {
    const response = await axios.get(API_URL)
    const result = response.data.slice(data.first, data.last)
    return result
  } catch (err) {
    console.error(err)
  }
}

function* fetchTodos(action: FetchingTodosRequest) {
  try {
    const result: resultType = yield call(fetchTodosAPI, action.data)
    yield put({
      type: FETCHING_TODOS_SUCCESS,
      data: result,
    })
  } catch (err) {
    console.error(err)
    yield put({
      type: FETCHING_TODOS_FAILURE,
      data: err,
    })
  }
}

function* watchFetchTodos() {
  yield takeLatest(FETCHING_TODOS_REQUEST, fetchTodos)
}

export default function* todoSaga() {
  yield all([fork(watchFetchTodos)])
}
