/* eslint-disable import/no-anonymous-default-export */
import { all, call, put, fork } from 'redux-saga/effects';
import { watchMostPopularVideos, watchMostPopularVideosByCategory, watchVideoCategories } from './video';
import { watchWatchDetails } from './watch';
import { watchCommentThread } from './comment';
import { watchSearchForVideos } from './search';

export default function* () {
    yield all([
        fork(watchMostPopularVideos),
        fork(watchVideoCategories),
        fork(watchMostPopularVideosByCategory),
        fork(watchWatchDetails),
        fork(watchCommentThread),
        fork(watchSearchForVideos)
    ]);
}

export function* fetchEntity(request, entity, ...args) {
    try {
        const response = yield call(request);
        yield put(entity.success(response.result, ...args));
    } catch (error) {
        yield put(entity.failure(error, ...args));
    }
}

export const ignoreErrors = (fn, ...args) => {
    return () => {
        const ignoreErrorCallback = (response) => response;
        return fn(...args).then(ignoreErrorCallback, ignoreErrorCallback);
    }
}