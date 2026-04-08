// javac DesignCircularQueue.java DesignCircularQueue_test.java && java -ea DesignCircularQueue_test
import java.util.List;
import java.util.Arrays;

public class DesignCircularQueue_test {
    public static void main(String[] args) {
        assert DesignCircularQueue.designCircularQueue(new String[]{"enqueue 1", "enqueue 2", "enqueue 3"}, 3).equals(Arrays.asList("true", "true", "true"));
        assert DesignCircularQueue.designCircularQueue(new String[]{"enqueue 1", "enqueue 2", "enqueue 3", "enqueue 4"}, 3).equals(Arrays.asList("true", "true", "true", "full"));
        assert DesignCircularQueue.designCircularQueue(new String[]{"dequeue"}, 3).equals(Arrays.asList("empty"));
        assert DesignCircularQueue.designCircularQueue(new String[]{"enqueue 1", "enqueue 2", "enqueue 3", "dequeue", "dequeue", "dequeue"}, 3).equals(Arrays.asList("true", "true", "true", "1", "2", "3"));
        assert DesignCircularQueue.designCircularQueue(new String[]{"enqueue 10", "enqueue 20", "front"}, 3).equals(Arrays.asList("true", "true", "10"));
        assert DesignCircularQueue.designCircularQueue(new String[]{"enqueue 10", "enqueue 20", "rear"}, 3).equals(Arrays.asList("true", "true", "20"));
        assert DesignCircularQueue.designCircularQueue(new String[]{"front", "rear"}, 3).equals(Arrays.asList("empty", "empty"));
        assert DesignCircularQueue.designCircularQueue(new String[]{"enqueue 42", "dequeue", "enqueue 99", "dequeue"}, 1).equals(Arrays.asList("true", "42", "true", "99"));
        assert DesignCircularQueue.designCircularQueue(new String[]{"enqueue 1", "dequeue", "dequeue"}, 2).equals(Arrays.asList("true", "1", "empty"));

        System.out.println("All tests passed!");
    }
}
