// Run-Length Decoding — expands a compressed string like "3a2b4c" into "aaabbcccc".
// Parses leading digit sequences as repeat counts, then repeats the following character.
// Time: O(output length)  Space: O(output length)

function runLengthDecoding(text: string): string {
  const output: string[] = []; // @step:initialize

  let readIndex = 0; // @step:initialize

  while (readIndex < text.length) {
    let digitString = ""; // @step:read-char

    while (readIndex < text.length && text[readIndex]! >= "0" && text[readIndex]! <= "9") {
      digitString += text[readIndex]!; // @step:read-char
      readIndex++;
    }

    const repeatCount = parseInt(digitString, 10); // @step:visit

    const letter = text[readIndex] ?? ""; // @step:read-char

    const repeated = letter.repeat(repeatCount); // @step:write-char

    for (const char of repeated) {
      output.push(char); // @step:write-char
    }

    readIndex++; // @step:visit
  }

  return output.join(""); // @step:complete
}
