// javac AsteroidCollision.java AsteroidCollision_test.java && java -ea AsteroidCollision_test
import java.util.Arrays;

public class AsteroidCollision_test {
    public static void main(String[] args) {
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{5, 10, -5}), new int[]{5, 10});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{8, -8}), new int[]{});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{10, 2, -5}), new int[]{10});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{-2, -1, 1, 2}), new int[]{-2, -1, 1, 2});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{1, -1, 1, -1}), new int[]{});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{1, 2, 3, -10}), new int[]{-10});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{-5, -3}), new int[]{-5, -3});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{7}), new int[]{7});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{}), new int[]{});
        assert Arrays.equals(AsteroidCollision.asteroidCollision(new int[]{5, 3, 1, -4}), new int[]{5});

        System.out.println("All tests passed!");
    }
}
