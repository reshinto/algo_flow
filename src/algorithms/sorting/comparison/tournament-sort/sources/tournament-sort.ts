// Tournament Sort — build a tournament tree of comparisons, extract winner, replace and rebuild
const TOURNAMENT_INFINITY = Number.POSITIVE_INFINITY;

function buildTournamentTree(leaves: number[]): number[] {
  // @step:build-tournament
  const leafCount = leaves.length; // @step:build-tournament
  const treeSize = 2 * leafCount; // @step:build-tournament
  const tree: number[] = new Array(treeSize).fill(TOURNAMENT_INFINITY); // @step:build-tournament

  // Place leaf values in second half of tree
  for (let leafIndex = 0; leafIndex < leafCount; leafIndex++) {
    // @step:build-tournament
    tree[leafCount + leafIndex] = leaves[leafIndex]!; // @step:build-tournament
  }

  // Build internal nodes (winners) bottom-up
  for (let nodeIndex = leafCount - 1; nodeIndex >= 1; nodeIndex--) {
    // @step:compare
    const leftChild = 2 * nodeIndex; // @step:compare
    const rightChild = 2 * nodeIndex + 1; // @step:compare
    tree[nodeIndex] = tree[leftChild]! <= tree[rightChild]! ? tree[leftChild]! : tree[rightChild]!; // @step:compare
  }

  return tree; // @step:build-tournament
}

function extractWinnerAndRebuild(tree: number[], leafCount: number): number {
  // @step:extract-winner
  const winner = tree[1]!; // @step:extract-winner

  // Find the leaf position that held the winner and replace with infinity
  let nodeIndex = 1; // @step:extract-winner
  while (nodeIndex < leafCount) {
    // @step:compare
    const leftChild = 2 * nodeIndex; // @step:compare
    const rightChild = 2 * nodeIndex + 1; // @step:compare
    nodeIndex = tree[leftChild]! === winner ? leftChild : rightChild; // @step:compare
  }

  tree[nodeIndex] = TOURNAMENT_INFINITY; // @step:extract-winner

  // Rebuild internal nodes from the modified leaf upward
  nodeIndex = Math.floor(nodeIndex / 2); // @step:build-tournament
  while (nodeIndex >= 1) {
    // @step:build-tournament
    const leftChild = 2 * nodeIndex; // @step:build-tournament
    const rightChild = 2 * nodeIndex + 1; // @step:build-tournament
    tree[nodeIndex] = tree[leftChild]! <= tree[rightChild]! ? tree[leftChild]! : tree[rightChild]!; // @step:compare
    nodeIndex = Math.floor(nodeIndex / 2); // @step:build-tournament
  }

  return winner; // @step:extract-winner
}

function tournamentSort(inputArray: number[]): number[] {
  // @step:initialize
  const arrayLength = inputArray.length; // @step:initialize

  if (arrayLength === 0) {
    return []; // @step:complete
  }

  const leaves = [...inputArray]; // @step:initialize
  const tree = buildTournamentTree(leaves); // @step:build-tournament
  const sortedArray: number[] = []; // @step:extract-winner

  for (let extractIndex = 0; extractIndex < arrayLength; extractIndex++) {
    // @step:extract-winner
    const winner = extractWinnerAndRebuild(tree, leaves.length); // @step:extract-winner
    sortedArray.push(winner); // @step:mark-sorted
  }

  // @step:mark-sorted
  return sortedArray; // @step:complete
}
