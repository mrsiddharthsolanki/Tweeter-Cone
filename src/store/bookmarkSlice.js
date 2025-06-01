import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    bookmarks: [],
    // loading: false,
    // error: null,
}

const bookmarkSlice = createSlice(
    {
        name: 'bookmark',
        initialState,
        reducers : {
            setBookmarks: (state, action) => {
                state.bookmarks = action.payload;
            },

            addBookmark: (state, action) => {
                state.bookmarks.unshift(action.payload);
            },

            removeBookmark: (state, action) => {
                state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload.id);
            },

        }
    }
)

export const {setBookmarks, addBookmark, removeBookmark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;