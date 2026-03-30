// Isomorphic Strings — check if two strings are isomorphic using bidirectional char mapping
export function isomorphicStrings(textA: string, textB: string): boolean {
  const aToB = new Map<string, string>(); // @step:initialize
  const bToA = new Map<string, string>(); // @step:initialize
  if (textA.length !== textB.length) return false; // @step:initialize
  for (let charIndex = 0; charIndex < textA.length; charIndex++) {
    const charA = textA[charIndex]!;
    const charB = textB[charIndex]!;
    const mappedB = aToB.get(charA); // @step:lookup-key
    const mappedA = bToA.get(charB); // @step:lookup-key
    if (mappedB === undefined && mappedA === undefined) {
      aToB.set(charA, charB); // @step:insert-key
      bToA.set(charB, charA); // @step:insert-key
    } else if (mappedB === charB && mappedA === charA) {
      continue; // @step:key-found
    } else {
      return false; // @step:key-not-found
    }
  }
  return true; // @step:complete
}
