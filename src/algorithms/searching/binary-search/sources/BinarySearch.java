public class BinarySearch {
    public static int binarySearch(int[] sortedArray, int targetValue) {
        int lowIndex = 0;
        int highIndex = sortedArray.length - 1;

        while (lowIndex <= highIndex) {
            int midIndex = (lowIndex + highIndex) / 2;
            int midValue = sortedArray[midIndex];

            if (midValue == targetValue) {
                return midIndex;
            } else if (midValue < targetValue) {
                lowIndex = midIndex + 1;
            } else {
                highIndex = midIndex - 1;
            }
        }

        return -1;
    }
}
