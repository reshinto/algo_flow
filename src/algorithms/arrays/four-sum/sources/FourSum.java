// Four Sum — finds all unique quadruplets summing to target via sorting and two-pointer reduction
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class FourSum {
    public static List<List<Integer>> fourSum(int[] inputArray, int target) {
        int[] sortedArray = inputArray.clone(); // @step:initialize
        Arrays.sort(sortedArray); // @step:initialize
        int arrayLength = sortedArray.length; // @step:initialize
        List<List<Integer>> quadruplets = new ArrayList<>(); // @step:initialize

        for (int firstIndex = 0; firstIndex < arrayLength - 3; firstIndex++) { // @step:visit

            if (firstIndex > 0 && sortedArray[firstIndex] == sortedArray[firstIndex - 1]) { // @step:compare
                continue; // @step:compare
            }

            for (int secondIndex = firstIndex + 1; secondIndex < arrayLength - 2; secondIndex++) { // @step:visit

                if (secondIndex > firstIndex + 1 && sortedArray[secondIndex] == sortedArray[secondIndex - 1]) { // @step:compare
                    continue; // @step:compare
                }

                int leftPointer = secondIndex + 1; // @step:visit
                int rightPointer = arrayLength - 1; // @step:visit

                while (leftPointer < rightPointer) { // @step:compare
                    long currentSum = (long) sortedArray[firstIndex] + sortedArray[secondIndex]
                            + sortedArray[leftPointer] + sortedArray[rightPointer]; // @step:compare

                    if (currentSum == target) { // @step:compare
                        quadruplets.add(Arrays.asList(
                                sortedArray[firstIndex],
                                sortedArray[secondIndex],
                                sortedArray[leftPointer],
                                sortedArray[rightPointer])); // @step:visit


                        while (leftPointer < rightPointer && sortedArray[leftPointer] == sortedArray[leftPointer + 1]) {
                            leftPointer++; // @step:compare
                        }
                        while (leftPointer < rightPointer && sortedArray[rightPointer] == sortedArray[rightPointer - 1]) {
                            rightPointer--; // @step:compare
                        }
                        leftPointer++; // @step:visit
                        rightPointer--; // @step:visit
                    } else if (currentSum < target) {
                        leftPointer++; // @step:visit
                    } else {
                        rightPointer--; // @step:visit
                    }
                }
            }
        }

        return quadruplets; // @step:complete
    }
}
