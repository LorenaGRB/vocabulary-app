import { create } from "zustand";
import { fetchWords } from "../mock/services/words";
// Definimos el tipo para una Palabra
export type Word = {
  id: number;
  term: string;
  definition: string;
  state: "to-learn" | "learning" | "learned";
};

interface WordsState {
  words: Word[];
  loadWords: () => Promise<void>;
  addWord: (word: Omit<Word, "id">) => Promise<Word | null>;
  updateWord: (id: number, updates: Partial<Word>) => Promise<Word | null>;
  markAsLearned: (id: number) => void;
}
const initialWords: Word[] = [];

export const useWordsStore = create<WordsState>((set) => ({
  words: initialWords,

  loadWords: async () => {
    const data = await fetchWords();
    set({ words: data });
  },

  addWord: async (wordData) => {
    const data: Omit<Word, "id"> = {
      state: "to-learn" as "to-learn",
      term: wordData.term,
      definition: wordData.definition,
    };
    try {
      const created = await import("../mock/services/words").then((module) =>
        module.createWord(data)
      );
      set((state) => ({ words: [...state.words, created] }));
      return created;
    } catch (error) {
      console.error("Error al agregar palabra:", error);
      return null;
    }
  },

  updateWord: async (id, updates) => {
    try {
      const updated = await import("../mock/services/words").then((module) =>
        module.updateWord(id, updates)
      );
      if (updated) {
        set((state) => ({
          words: state.words.map((w) => (w.id === id ? updated : w)),
        }));
      }
      return updated;
    } catch (error) {
      console.error("Error al actualizar palabra:", error);
      return null;
    }
  },

  markAsLearned: (id) => {
    set((state) => ({
      words: state.words.map((w) =>
        w.id === id ? { ...w, state: "learned" } : w
      ),
    }));
  },
}));
