public class JumpSearch {
    public static int jumpSearch(int[] sortedArray, int targetValue) { // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        if (arrayLength == 0) return -1; // @step:initialize

        int blockSize = (int) Math.floor(Math.sqrt(arrayLength)); // @step:initialize
        int blockStart = 0; // @step:initialize
        int jumpEnd = blockSize; // @step:initialize

        while (jumpEnd < arrayLength && sortedArray[jumpEnd - 1] < targetValue) {
            // @step:visit
            blockStart = jumpEnd; // @step:visit
            jumpEnd += blockSize; // @step:visit
        }

        // Linear scan within the identified block
        int scanEnd = Math.min(jumpEnd, arrayLength); // @step:compare
        for (int currentIndex = blockStart; currentIndex < scanEnd; currentIndex++) { // @step:compare
            if (sortedArray[currentIndex] == targetValue) { // @step:compare,found
                return currentIndex; // @step:found
            }
        }

        return -1; // @step:complete
    }
}
