// javac ImplementQueueUsingStacks.java ImplementQueueUsingStacks_test.java && java -ea ImplementQueueUsingStacks_test
import java.util.List;
import java.util.Arrays;

public class ImplementQueueUsingStacks_test {
    public static void main(String[] args) {
        assert ImplementQueueUsingStacks.implementQueueUsingStacks(new int[]{1, 2, 3, 4, 5}).equals(Arrays.asList(1, 2, 3, 4, 5));
        assert ImplementQueueUsingStacks.implementQueueUsingStacks(new int[]{10, 20}).equals(Arrays.asList(10, 20));
        assert ImplementQueueUsingStacks.implementQueueUsingStacks(new int[]{42}).equals(Arrays.asList(42));
        assert ImplementQueueUsingStacks.implementQueueUsingStacks(new int[]{}).equals(List.of());
        assert ImplementQueueUsingStacks.implementQueueUsingStacks(new int[]{7, 7, 7}).equals(Arrays.asList(7, 7, 7));
        assert ImplementQueueUsingStacks.implementQueueUsingStacks(new int[]{5, 4, 3, 2, 1}).equals(Arrays.asList(5, 4, 3, 2, 1));
        assert ImplementQueueUsingStacks.implementQueueUsingStacks(new int[]{-3, -1, 0, 2}).equals(Arrays.asList(-3, -1, 0, 2));

        System.out.println("All tests passed!");
    }
}
