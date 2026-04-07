import java.util.Arrays;

public class CyclicSort_test {
    public static void main(String[] args) {
        // Basic unsorted [3,5,2,1,4] -> [1,2,3,4,5]
        assert Arrays.equals(CyclicSort.cyclicSort(new int[]{3, 5, 2, 1, 4}), new int[]{1, 2, 3, 4, 5});

        // Already sorted [1,2,3,4]
        assert Arrays.equals(CyclicSort.cyclicSort(new int[]{1, 2, 3, 4}), new int[]{1, 2, 3, 4});

        // Reverse sorted [5,4,3,2,1]
        assert Arrays.equals(CyclicSort.cyclicSort(new int[]{5, 4, 3, 2, 1}), new int[]{1, 2, 3, 4, 5});

        // Single element
        assert Arrays.equals(CyclicSort.cyclicSort(new int[]{1}), new int[]{1});

        // Empty array
        assert Arrays.equals(CyclicSort.cyclicSort(new int[]{}), new int[]{});

        // Two elements swapped
        assert Arrays.equals(CyclicSort.cyclicSort(new int[]{2, 1}), new int[]{1, 2});

        // Default input [3,5,2,1,4,6]
        assert Arrays.equals(CyclicSort.cyclicSort(new int[]{3, 5, 2, 1, 4, 6}), new int[]{1, 2, 3, 4, 5, 6});

        // Longer array
        assert Arrays.equals(CyclicSort.cyclicSort(new int[]{8, 3, 6, 1, 5, 9, 2, 7, 4, 10}),
            new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9, 10});

        System.out.println("All tests passed!");
    }
}
