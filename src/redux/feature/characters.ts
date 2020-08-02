import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CharacterSquares {
  [character: string]: string[]
}

export interface CharactersStateInterface {
  characters: string[];
  characterSquares: CharacterSquares;
  selectedCharacter: string;
}

const INITIAL_STATE: CharactersStateInterface = {
  characters: [],
  characterSquares: {},
  selectedCharacter: ""
}

const charactersSlice = createSlice({
  name: 'characters',
  initialState: INITIAL_STATE,
  reducers: {
    setCharacters(state, action: PayloadAction<string[]>) {
      if (action.payload.length === 1) {
        return { ...state, characters: action.payload, selectedCharacter: action.payload[0] };
      } else {
        return { ...state, characters: action.payload, selectedCharacter: '' };
      }
    },
    selectCharacters(state, action: PayloadAction<string>) {
      return { ...state, selectedCharacter: action.payload };
    },
    setCharacterSquares(state, action: PayloadAction<CharacterSquares>) {
      return { ...state, characterSquares: { ...state.characterSquares, ...action.payload }};
    },
  }
});

export const { setCharacters, selectCharacters,setCharacterSquares } = charactersSlice.actions;

export default charactersSlice.reducer;