public class CubeSort {
    public static int[] cubeSort(int[] inputArray) { // @step:initialize
        int[] sortedArray = inputArray.clone(); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize

        if (arrayLength <= 1) return sortedArray; // @step:initialize

        // Compute block size as cube root of array length
        int blockSize = Math.max(1, (int) Math.ceil(Math.cbrt(arrayLength))); // @step:initialize

        // Phase 1: Insertion sort each block
        int blockCount = (int) Math.ceil((double) arrayLength / blockSize);
        for (int blockIndex = 0; blockIndex < blockCount; blockIndex++) { // @step:divide-block
            int blockStart = blockIndex * blockSize; // @step:divide-block
            int blockEnd = Math.min(blockStart + blockSize, arrayLength); // @step:divide-block

            for (int outerIndex = blockStart + 1; outerIndex < blockEnd; outerIndex++) {
                int currentValue = sortedArray[outerIndex]; // @step:compare
                int innerIndex = outerIndex - 1;

                while (innerIndex >= blockStart && sortedArray[innerIndex] > currentValue) { // @step:swap
                    sortedArray[innerIndex + 1] = sortedArray[innerIndex]; // @step:swap
                    innerIndex--;
                }
                sortedArray[innerIndex + 1] = currentValue; // @step:swap
            }
        }

        // Phase 2: K-way merge of all sorted blocks
        int[] resultArray = new int[arrayLength];
        int[] blockPointers = new int[blockCount];
        for (int blockIndex = 0; blockIndex < blockCount; blockIndex++) {
            blockPointers[blockIndex] = blockIndex * blockSize;
        }

        for (int resultIndex = 0; resultIndex < arrayLength; resultIndex++) { // @step:merge-blocks
            int minimumValue = Integer.MAX_VALUE;
            int minimumBlock = -1;

            for (int blockIndex = 0; blockIndex < blockCount; blockIndex++) { // @step:compare
                int pointer = blockPointers[blockIndex];
                int blockEnd = Math.min((blockIndex + 1) * blockSize, arrayLength);

                if (pointer < blockEnd && sortedArray[pointer] < minimumValue) { // @step:compare
                    minimumValue = sortedArray[pointer];
                    minimumBlock = blockIndex;
                }
            }

            resultArray[resultIndex] = minimumValue; // @step:merge-blocks
            blockPointers[minimumBlock]++; // @step:merge-blocks
        }

        // Copy result back
        for (int copyIndex = 0; copyIndex < arrayLength; copyIndex++) {
            sortedArray[copyIndex] = resultArray[copyIndex]; // @step:mark-sorted
        }

        return sortedArray; // @step:complete
    }
}
