
import type { AppThunk } from '@/app/model/store/Store';
import { bookActions } from '@/services/slices/book';

export const openBookAtPage = (targetPage: number): AppThunk => async (dispatch, getState) => {
    const { currentPage, isAnimating } = getState().persisted.book;

    if (isAnimating) return;

    dispatch(bookActions.openBook());

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const step = currentPage < targetPage ? 1 : -1;

    for (let p = currentPage; p !== targetPage; p += step) {
        dispatch(bookActions.startAnimation());
        dispatch(bookActions.setCurrentPage(p + step));
        await delay(300); // задержка между листами
        dispatch(bookActions.endAnimation());
    }
};