export interface BookState {
    isOpen: boolean,
    isAnimating: boolean,
    isFinished: boolean,
    currentPage: number,
    currentLeave: number,
    prevLeave: number,
    total_leave: number,
    isBookmark: boolean,
    baze_z: number,
}

export const initialState: BookState = {
    isOpen: false,
    isAnimating: false,
    isFinished: false,
    currentPage: 0,
    total_leave: 3,
    currentLeave: 3,
    prevLeave: 1,
    isBookmark: false,
    baze_z: 0.05,
}