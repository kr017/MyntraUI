import { createContext, useContext, useReducer } from "react";

const notesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE": //create note
      return {
        notes: [action.payload, ...state.notes],
      };

    case "GET_NOTES":
      return {
        notes: action.payload,
      };

    case "UPDATE_NOTE":
      return {
        notes: state.notes.map(note => {
          if (note._id === action.payload._id) {
            note = action.payload;
          }
          return note;
        }),
      };
    case "ARCHIEVE_NOTE":
      return {
        notes: state.notes.filter(note => note._id !== action.payload._id),
      };
    case "UNARCHIEVE_NOTE":
      return {
        notes: state.notes.filter(note => note._id !== action.payload._id),
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter(note => note._id !== action.payload._id),
      };
    case "DELETE_NOTE_PERMANENT":
      return {
        notes: state.notes.filter(note => note._id !== action.payload._id),
      };
    case "RESTORE_NOTE":
      return {
        notes: state.notes.filter(note => note._id !== action.payload._id),
      };
    // return null;
    default:
      return state;
  }
};

const initalState = { notes: [] };

export const NotesProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, initalState);

  return (
    <notesContext.Provider value={{ notesState, notesDispatch }}>
      {children}
    </notesContext.Provider>
  );
};

export const useNote = () => {
  return useContext(notesContext);
};
