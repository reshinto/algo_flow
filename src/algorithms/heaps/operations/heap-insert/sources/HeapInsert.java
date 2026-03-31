// Heap Insert — append a value to a min-heap and restore heap property via sift-up
import java.util.Arrays;

public class HeapInsert {
    public static int[] heapInsert(int[] heapArray, int value) {
        int[] array = Arrays.copyOf(heapArray, heapArray.length + 1); // @step:initialize
        array[array.length - 1] = value; // @step:heap-insert
        int currentIdx = array.length - 1; // @step:heap-insert
        // Sift up: while not at root, compare with parent and swap if smaller
        while (currentIdx > 0) { // @step:sift-up
            int parentIdx = (currentIdx - 1) / 2; // @step:sift-up
            if (array[currentIdx] >= array[parentIdx]) break; // @step:sift-up
            // Swap with parent to restore heap property
            int temp = array[currentIdx]; // @step:heap-swap
            array[currentIdx] = array[parentIdx]; // @step:heap-swap
            array[parentIdx] = temp; // @step:heap-swap
            currentIdx = parentIdx; // @step:sift-up
        }
        return array; // @step:complete
    }
}
