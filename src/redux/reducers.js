import { createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = {
    questions: [],
    grade: 0,
}

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.getQuestions.fulfilled, (state, action) => {
            state.questions = action.payload.questions
        })
})

export default reducer