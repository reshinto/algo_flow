// Heap Peek — return the minimum element (root) from a min-heap without removing it
public class HeapPeek {
    public static int heapPeek(int[] heapArray) {
        int[] array = heapArray.clone(); // @step:initialize
        // The root at index 0 is always the minimum in a valid min-heap
        int minimumValue = array[0]; // @step:visit
        return minimumValue; // @step:complete
    }
}
