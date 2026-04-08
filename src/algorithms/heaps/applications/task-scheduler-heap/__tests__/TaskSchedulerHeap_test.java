public class TaskSchedulerHeap_test {
    public static void main(String[] args) {
        assert TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A","A","A","B","B","B"}, 2) == 8 : "Test 1 failed";
        assert TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A","A","A","B","B","B"}, 0) == 6 : "Test 2 failed";
        assert TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A","A","A","B","B","B"}, 1) == 6 : "Test 3 failed";
        assert TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A","A","A"}, 2) == 7 : "Test 4 failed";
        assert TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A"}, 0) == 1 : "Test 5 failed";
        assert TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A"}, 10) == 1 : "Test 6 failed";
        assert TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A","C","A","B","D","B"}, 1) == 6 : "Test 7 failed";
        int result = TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A","A","A","B","B","B"}, 2);
        assert result >= 6 : "Test 8 failed: result should be >= task count";
        assert TaskSchedulerHeap.taskSchedulerHeap(new String[]{"A","B","C","D","E"}, 0) == 5 : "Test 9 failed";
        System.out.println("All tests passed!");
    }
}
