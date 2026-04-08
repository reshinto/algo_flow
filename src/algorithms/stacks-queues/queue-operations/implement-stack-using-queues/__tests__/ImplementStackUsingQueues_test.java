// javac ImplementStackUsingQueues.java ImplementStackUsingQueues_test.java && java -ea ImplementStackUsingQueues_test
import java.util.List;
import java.util.Arrays;

public class ImplementStackUsingQueues_test {
    public static void main(String[] args) {
        assert ImplementStackUsingQueues.implementStackUsingQueues(new int[]{1, 2, 3, 4, 5}).equals(Arrays.asList(5, 4, 3, 2, 1));
        assert ImplementStackUsingQueues.implementStackUsingQueues(new int[]{10, 20}).equals(Arrays.asList(20, 10));
        assert ImplementStackUsingQueues.implementStackUsingQueues(new int[]{42}).equals(Arrays.asList(42));
        assert ImplementStackUsingQueues.implementStackUsingQueues(new int[]{}).equals(List.of());
        assert ImplementStackUsingQueues.implementStackUsingQueues(new int[]{7, 7, 7}).equals(Arrays.asList(7, 7, 7));
        assert ImplementStackUsingQueues.implementStackUsingQueues(new int[]{5, 4, 3, 2, 1}).equals(Arrays.asList(1, 2, 3, 4, 5));
        assert ImplementStackUsingQueues.implementStackUsingQueues(new int[]{1, 2, 3}).equals(Arrays.asList(3, 2, 1));
        assert ImplementStackUsingQueues.implementStackUsingQueues(new int[]{-3, -1, 0, 2}).equals(Arrays.asList(2, 0, -1, -3));

        System.out.println("All tests passed!");
    }
}
