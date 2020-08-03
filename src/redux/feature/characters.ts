/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAction,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

const NUMBER_OF_SQUARES = 24;

type Character = {
  id: string;
  name: string;
  squares: string[];
};

export interface State {
  characters: {[id: string]: Character},
  selectedCharacter: Character| null
}

const INITIAL_STATE: State = {
  characters: {},
  selectedCharacter: null,
};

export const charactersReceived = createAction('charactersReceived', (characters) => ({ payload: characters }));

export const selectCharacter = createAction(
  'selectCharacter',
  (characterName) => ({
    payload: characterName,
  }),
);

export const setCharacters = createAsyncThunk(
  'setCharacters',
  async (characters: Character[], { dispatch, getState }) => {
    dispatch(charactersReceived(characters));
    if (characters.length === 1) {
      const state = getState() as {
        characters: State
      };
      dispatch(selectCharacter(state.characters.characters[characters[0].id]));
    }
  },
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(charactersReceived, (state, action: PayloadAction<Character[]>) => {
      state.characters = {};

      action.payload.forEach((character) => {
        state.characters[character.id] = character;
      });
    });
    builder.addCase(selectCharacter, (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = {
        ...action.payload,
        squares: [...action.payload.squares].sort(
          () => Math.random() - Math.random(),
        ).slice(0, NUMBER_OF_SQUARES),
      };
    });
  },
});

export default charactersSlice.reducer;
