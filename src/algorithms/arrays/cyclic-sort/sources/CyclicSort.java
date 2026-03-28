// Cyclic Sort — O(n) sort for arrays containing values 1..n by placing each at index value-1
public class CyclicSort {
    public static int[] cyclicSort(int[] inputArray) {
        int[] result = inputArray.clone(); // @step:initialize
        int currentIndex = 0; // @step:initialize

        while (currentIndex < result.length) {
            int currentValue = result[currentIndex]; // @step:compare
            int correctIndex = currentValue - 1; // @step:compare

            if (currentValue != currentIndex + 1) { // @step:compare
                int tempValue = result[correctIndex]; // @step:swap
                result[correctIndex] = result[currentIndex]; // @step:swap
                result[currentIndex] = tempValue; // @step:swap
            } else {
                currentIndex++; // @step:visit
            }
        }

        return result; // @step:complete
    }
}
