// javac MinStack.java MinStack_test.java && java -ea MinStack_test
public class MinStack_test {
    public static void main(String[] args) {
        assert MinStack.minStack(new int[]{5, 3, 7, 1, 8}) == 1;
        assert MinStack.minStack(new int[]{1, 2, 3}) == 1;
        assert MinStack.minStack(new int[]{3, 2, 1}) == 1;
        assert MinStack.minStack(new int[]{42}) == 42;
        assert MinStack.minStack(new int[]{7, 7, 7}) == 7;
        assert MinStack.minStack(new int[]{5, -3, 2, -1}) == -3;
        assert MinStack.minStack(new int[]{1, 5, 10, 20}) == 1;
        assert MinStack.minStack(new int[]{20, 10, 5, 1}) == 1;

        System.out.println("All tests passed!");
    }
}
