import { mockWords } from "../data/words";
import { Word } from "../../store/words";

export async function fetchWords(): Promise<Word[]> {
  // await new Promise(res => setTimeout(res, 500));
  return [...mockWords];
}

export async function createWord(newWord: Omit<Word, "id">): Promise<Word> {
  const newId =
    mockWords.length > 0 ? Math.max(...mockWords.map((w) => w.id)) + 1 : 1;
  const word: Word = { id: newId, ...newWord };
  mockWords.push(word);
  return word;
}

export async function updateWord(
  id: number,
  updates: Partial<Word>
): Promise<Word | null> {
  const index = mockWords.findIndex((w) => w.id === id);
  if (index === -1) return null;
  mockWords[index] = { ...mockWords[index], ...updates };
  return mockWords[index];
}
