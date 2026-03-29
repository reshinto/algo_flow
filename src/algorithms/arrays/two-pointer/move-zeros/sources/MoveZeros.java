// Move Zeros to End — O(n) two-pointer: write pointer tracks next write position, read pointer scans
public class MoveZeros {
    public static int[] moveZeros(int[] inputArray) {
        int[] result = inputArray.clone();
        int writePointer = 0; // @step:initialize

        for (int readPointer = 0; readPointer < result.length; readPointer++) {
            int currentElement = result[readPointer]; // @step:compare
            if (currentElement != 0) { // @step:compare
                int tempValue = result[writePointer]; // @step:swap
                result[writePointer] = currentElement; // @step:swap
                result[readPointer] = tempValue; // @step:swap
                writePointer++; // @step:visit
            }
        }

        return result; // @step:complete
    }
}
