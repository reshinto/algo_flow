// Smooth Sort — Leonardo heap variant of heap sort; adaptive O(n) best case on nearly-sorted data
function smoothSort(inputArray: number[]): number[] {
  // @step:initialize
  const sortedArray = [...inputArray]; // @step:initialize
  const arrayLength = sortedArray.length; // @step:initialize

  if (arrayLength <= 1) return sortedArray; // @step:initialize

  // Precompute Leonardo numbers up to at least arrayLength
  const leonardoNumbers: number[] = [1, 1];
  while (leonardoNumbers[leonardoNumbers.length - 1]! < arrayLength) {
    const len = leonardoNumbers.length;
    leonardoNumbers.push(leonardoNumbers[len - 1]! + leonardoNumbers[len - 2]! + 1);
  }

  // Sift element at rootIndex down within a Leonardo tree of given order.
  // For order k: rightChild = root-1 (order k-1), leftChild = root-1-L[k-1] (order k-2).
  function sift(rootIndex: number, order: number): void {
    // @step:build-heap
    let currentRoot = rootIndex;
    let currentOrder = order;

    while (currentOrder >= 2) {
      const rightChild = currentRoot - 1; // @step:compare
      const leftChild = currentRoot - 1 - (leonardoNumbers[currentOrder - 1] ?? 1); // @step:compare

      // Find the largest among root, right child, and left child
      let largestIndex = currentRoot;
      if (sortedArray[rightChild]! > sortedArray[largestIndex]!) {
        largestIndex = rightChild; // @step:compare
      }
      if (sortedArray[leftChild]! > sortedArray[largestIndex]!) {
        largestIndex = leftChild; // @step:compare
      }

      if (largestIndex === currentRoot) break; // already a valid heap

      // @step:swap
      const temporaryValue = sortedArray[currentRoot]!; // @step:swap
      sortedArray[currentRoot] = sortedArray[largestIndex]!; // @step:swap
      sortedArray[largestIndex] = temporaryValue; // @step:swap

      if (largestIndex === rightChild) {
        currentOrder = currentOrder - 1;
      } else {
        currentOrder = currentOrder - 2;
      }
      currentRoot = largestIndex;
    }
  }

  // Trinkle: fix the heap root at rootIndex relative to all previous heap roots.
  // Ensures the rightmost root holds the maximum among all roots.
  function trinkle(
    rootIndex: number,
    order: number,
    prevPositions: number[],
    prevOrders: number[],
  ): void {
    // @step:build-heap
    let currentRoot = rootIndex;
    let currentOrder = order;
    let positions = [...prevPositions];
    let orders = [...prevOrders];

    while (positions.length > 0) {
      const prevRootIndex = positions[positions.length - 1]!;
      const prevRootOrder = orders[orders.length - 1]!;

      if (sortedArray[currentRoot]! >= sortedArray[prevRootIndex]!) break; // @step:compare

      // Check that prevRoot's value is at least as large as currentRoot's children.
      // If not, swapping would violate the heap property at currentRoot's position.
      if (currentOrder >= 2) {
        const rightChild = currentRoot - 1;
        const leftChild = currentRoot - 1 - (leonardoNumbers[currentOrder - 1] ?? 1);
        if (
          sortedArray[prevRootIndex]! < sortedArray[rightChild]! ||
          sortedArray[prevRootIndex]! < sortedArray[leftChild]!
        ) {
          break; // @step:compare
        }
      }

      // @step:swap
      const temporaryValue = sortedArray[currentRoot]!; // @step:swap
      sortedArray[currentRoot] = sortedArray[prevRootIndex]!; // @step:swap
      sortedArray[prevRootIndex] = temporaryValue; // @step:swap

      positions = positions.slice(0, -1);
      orders = orders.slice(0, -1);
      currentRoot = prevRootIndex;
      currentOrder = prevRootOrder;
    }

    sift(currentRoot, currentOrder);
  }

  // Build the Leonardo heap forest incrementally.
  // Merge two rightmost trees when the right tree's order = left tree's order + 1.
  const heapPositions: number[] = [];
  const heapOrders: number[] = [];

  for (let buildIndex = 0; buildIndex < arrayLength; buildIndex++) {
    // @step:build-heap
    const rootCount = heapOrders.length;
    if (rootCount >= 2 && heapOrders[rootCount - 1]! === heapOrders[rootCount - 2]! + 1) {
      // Merge: left tree (order k) + right tree (order k+1) → new tree (order k+2)
      const newOrder = heapOrders[rootCount - 1]! + 1;
      heapPositions.splice(rootCount - 2, 2);
      heapOrders.splice(rootCount - 2, 2);
      heapPositions.push(buildIndex);
      heapOrders.push(newOrder);
    } else if (rootCount >= 1 && heapOrders[rootCount - 1]! === 1) {
      heapPositions.push(buildIndex);
      heapOrders.push(0);
    } else {
      heapPositions.push(buildIndex);
      heapOrders.push(1);
    }

    const lastIndex = heapPositions.length - 1;
    trinkle(
      heapPositions[lastIndex]!,
      heapOrders[lastIndex]!,
      heapPositions.slice(0, lastIndex),
      heapOrders.slice(0, lastIndex),
    );
  }

  // Extract phase: shrink the heap forest from the right, exposing sorted elements.
  for (let extractIndex = arrayLength - 1; extractIndex >= 0; extractIndex--) {
    // @step:extract
    const currentOrder = heapOrders[heapOrders.length - 1]!;
    heapPositions.pop();
    heapOrders.pop();

    if (currentOrder >= 2) {
      // Split the current tree into its two sub-trees and re-heapify them
      const rightRoot = extractIndex - 1;
      const leftRoot = extractIndex - 1 - (leonardoNumbers[currentOrder - 1] ?? 1);
      heapPositions.push(leftRoot);
      heapOrders.push(currentOrder - 2);
      heapPositions.push(rightRoot);
      heapOrders.push(currentOrder - 1);

      const lastIndex = heapPositions.length - 1;
      trinkle(
        leftRoot,
        currentOrder - 2,
        heapPositions.slice(0, lastIndex - 1),
        heapOrders.slice(0, lastIndex - 1),
      );
      trinkle(
        rightRoot,
        currentOrder - 1,
        heapPositions.slice(0, lastIndex),
        heapOrders.slice(0, lastIndex),
      );
    }

    // @step:mark-sorted
  }

  return sortedArray; // @step:complete
}
