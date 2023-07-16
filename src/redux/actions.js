import { createAsyncThunk } from '@reduxjs/toolkit'

const ACTION_GET_QUESTIONS = 'ACTION_GET_QUESTIONS'

export const getQuestions = createAsyncThunk(
    ACTION_GET_QUESTIONS,
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/questions.json')
            const questions = await response.json()
            return { questions }
        }
        catch ( e ) { return  rejectWithValue(e.message) }
    }
)