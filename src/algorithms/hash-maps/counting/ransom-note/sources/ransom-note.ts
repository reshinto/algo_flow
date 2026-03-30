// Ransom Note — check if a ransom note can be constructed from magazine characters
function ransomNote(ransomNoteText: string, magazine: string): boolean {
  const charCounts = new Map<string, number>(); // @step:initialize
  for (const currentChar of magazine) {
    charCounts.set(currentChar, (charCounts.get(currentChar) ?? 0) + 1); // @step:increment-count
  }
  for (const currentChar of ransomNoteText) {
    const updatedCount = (charCounts.get(currentChar) ?? 0) - 1; // @step:decrement-count
    if (updatedCount < 0) return false; // @step:complete
    charCounts.set(currentChar, updatedCount); // @step:decrement-count
  }
  return true; // @step:complete
}
