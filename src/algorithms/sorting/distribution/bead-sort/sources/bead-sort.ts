// Bead Sort (Gravity Sort) — represent numbers as rows of beads, let gravity pull beads down column by column
function beadSort(inputArray: number[]): number[] {
  // @step:initialize
  const sourceArray = [...inputArray]; // @step:initialize
  const arrayLength = sourceArray.length; // @step:initialize

  if (arrayLength <= 1) {
    return sourceArray; // @step:complete
  }

  // Offset negative values so all are non-negative integers
  const minValue = Math.min(...sourceArray); // @step:initialize
  const offset = minValue < 0 ? -minValue : 0; // @step:initialize
  const shiftedArray = sourceArray.map((value) => value + offset); // @step:initialize
  const maxValue = Math.max(...shiftedArray); // @step:initialize

  if (maxValue === 0) {
    return sourceArray; // @step:complete
  }

  // Represent each number as a row of beads on an abacus
  // grid[row][col] = 1 means a bead is present, 0 means empty
  const grid: number[][] = Array.from({ length: arrayLength }, (_, rowIndex) =>
    Array.from({ length: maxValue }, (__, colIndex) =>
      colIndex < shiftedArray[rowIndex]! ? 1 : 0,
    ),
  ); // @step:initialize

  // Gravity drop — for each column, count beads and stack them at the bottom
  for (let colIndex = 0; colIndex < maxValue; colIndex++) {
    // @step:drop-beads,compare
    let beadCount = 0; // @step:drop-beads,compare
    for (let rowIndex = 0; rowIndex < arrayLength; rowIndex++) {
      // @step:drop-beads,compare
      beadCount += grid[rowIndex]![colIndex]!; // @step:drop-beads,compare
      grid[rowIndex]![colIndex] = 0; // @step:drop-beads,compare
    }
    // Stack beads at the bottom of this column (gravity effect)
    for (let rowIndex = arrayLength - beadCount; rowIndex < arrayLength; rowIndex++) {
      // @step:drop-beads
      grid[rowIndex]![colIndex] = 1; // @step:drop-beads
    }
  }

  // Read bead counts from each row — each row's bead count is the sorted value
  for (let rowIndex = 0; rowIndex < arrayLength; rowIndex++) {
    // @step:mark-sorted
    let rowBeadCount = 0; // @step:mark-sorted
    for (let colIndex = 0; colIndex < maxValue; colIndex++) {
      // @step:mark-sorted
      rowBeadCount += grid[rowIndex]![colIndex]!; // @step:mark-sorted
    }
    sourceArray[rowIndex] = rowBeadCount - offset; // @step:mark-sorted
  }

  return sourceArray; // @step:complete
}
