public class Fibonacci {
    public static int fibonacciTabulation(int targetIndex) {
        if (targetIndex <= 1) return targetIndex;
        int[] dpTable = new int[targetIndex + 1];
        dpTable[1] = 1;
        for (int currentIndex = 2; currentIndex <= targetIndex; currentIndex++) {
            dpTable[currentIndex] = dpTable[currentIndex - 1] + dpTable[currentIndex - 2];
        }
        return dpTable[targetIndex];
    }
}
