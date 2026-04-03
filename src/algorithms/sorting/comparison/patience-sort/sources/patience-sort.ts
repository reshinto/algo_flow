// Patience Sort — place cards into piles using patience game rules, then merge piles

function findPileIndex(piles: number[][], cardValue: number): number {
  // @step:compare
  // Binary search for the leftmost pile whose top is >= cardValue
  let leftBound = 0; // @step:compare
  let rightBound = piles.length; // @step:compare

  while (leftBound < rightBound) {
    // @step:compare
    const midIndex = Math.floor((leftBound + rightBound) / 2); // @step:compare
    if (piles[midIndex]![piles[midIndex]!.length - 1]! < cardValue) {
      // @step:compare
      leftBound = midIndex + 1; // @step:compare
    } else {
      rightBound = midIndex; // @step:compare
    }
  }

  return leftBound; // @step:compare
}

function mergePiles(piles: number[][]): number[] {
  // @step:merge-piles
  // Min-heap style k-way merge using a simple sorted extraction
  const sortedOutput: number[] = []; // @step:merge-piles

  while (piles.some((pile) => pile.length > 0)) {
    // @step:merge-piles
    let minimumValue = Number.POSITIVE_INFINITY; // @step:compare
    let minimumPileIndex = 0; // @step:compare

    for (let pileIndex = 0; pileIndex < piles.length; pileIndex++) {
      // @step:compare
      const pileTop = piles[pileIndex]![piles[pileIndex]!.length - 1]!; // @step:compare
      if (pileTop < minimumValue) {
        // @step:compare
        minimumValue = pileTop; // @step:compare
        minimumPileIndex = pileIndex; // @step:compare
      }
    }

    sortedOutput.push(piles[minimumPileIndex]!.pop()!); // @step:swap
    if (piles[minimumPileIndex]!.length === 0) {
      piles.splice(minimumPileIndex, 1); // @step:merge-piles
    }
  }

  return sortedOutput; // @step:merge-piles
}

function patienceSort(inputArray: number[]): number[] {
  // @step:initialize
  const arrayLength = inputArray.length; // @step:initialize

  if (arrayLength === 0) {
    return []; // @step:complete
  }

  const piles: number[][] = []; // @step:initialize

  // Place each card into the leftmost valid pile
  for (let cardIndex = 0; cardIndex < arrayLength; cardIndex++) {
    // @step:place-card
    const cardValue = inputArray[cardIndex]!; // @step:place-card
    const targetPileIndex = findPileIndex(piles, cardValue); // @step:compare

    if (targetPileIndex === piles.length) {
      piles.push([cardValue]); // @step:place-card
    } else {
      piles[targetPileIndex]!.push(cardValue); // @step:place-card
    }
  }

  // Merge all piles into sorted output
  const sortedArray = mergePiles(piles); // @step:merge-piles

  // @step:mark-sorted
  return sortedArray; // @step:complete
}
