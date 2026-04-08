public class HeapPeek_test {
    public static void main(String[] args) {
        assert HeapPeek.heapPeek(new int[]{1,3,5,7,9,8,6}) == 1 : "Test 1 failed";
        assert HeapPeek.heapPeek(new int[]{42}) == 42 : "Test 2 failed";
        assert HeapPeek.heapPeek(new int[]{2,7}) == 2 : "Test 3 failed";
        assert HeapPeek.heapPeek(new int[]{1,3,2,7,5,8,4,9,6}) == 1 : "Test 4 failed";
        int[] heap = {1, 3, 5, 7};
        assert HeapPeek.heapPeek(heap) == HeapPeek.heapPeek(heap) : "Test 5 failed: idempotent";
        System.out.println("All tests passed!");
    }
}
