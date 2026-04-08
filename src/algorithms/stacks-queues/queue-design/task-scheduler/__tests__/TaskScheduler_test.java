// javac TaskScheduler.java TaskScheduler_test.java && java -ea TaskScheduler_test
public class TaskScheduler_test {
    public static void main(String[] args) {
        assert TaskScheduler.taskSchedulerQueue(new String[]{"A", "A", "A", "B", "B", "B"}, 2) == 8;
        assert TaskScheduler.taskSchedulerQueue(new String[]{"A", "A", "B", "B", "C", "C"}, 1) == 6;
        assert TaskScheduler.taskSchedulerQueue(new String[]{"A", "A", "A", "B", "B", "B"}, 0) == 6;
        assert TaskScheduler.taskSchedulerQueue(new String[]{"A", "A", "A"}, 100) == 203;
        assert TaskScheduler.taskSchedulerQueue(new String[]{"A"}, 5) == 1;
        assert TaskScheduler.taskSchedulerQueue(new String[]{"A", "A", "B", "B"}, 2) == 5;
        assert TaskScheduler.taskSchedulerQueue(new String[]{"A", "A", "A", "A"}, 0) == 4;
        assert TaskScheduler.taskSchedulerQueue(new String[]{"A", "B", "C", "D", "E", "F"}, 3) >= 6;

        String[] distinctTasks = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        assert TaskScheduler.taskSchedulerQueue(distinctTasks, 25) == 26;

        System.out.println("All tests passed!");
    }
}
