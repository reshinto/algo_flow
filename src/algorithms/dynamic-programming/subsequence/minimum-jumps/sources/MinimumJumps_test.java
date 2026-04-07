// javac MinimumJumps.java MinimumJumps_test.java && java -ea MinimumJumps_test
public class MinimumJumps_test {
    public static void main(String[] args) {
        assert MinimumJumps.minimumJumps(new int[]{2, 3, 1, 1, 4}) == 2 : "[2,3,1,1,4] should return 2";
        assert MinimumJumps.minimumJumps(new int[]{1, 1, 1, 1}) == 3 : "[1,1,1,1] should return 3";
        assert MinimumJumps.minimumJumps(new int[]{2, 1}) == 1 : "[2,1] should return 1";
        assert MinimumJumps.minimumJumps(new int[]{0}) == 0 : "[0] single element should return 0";
        assert MinimumJumps.minimumJumps(new int[]{1, 0, 1}) == -1 : "[1,0,1] unreachable should return -1";
        assert MinimumJumps.minimumJumps(new int[]{}) == 0 : "empty array should return 0";
        assert MinimumJumps.minimumJumps(new int[]{5, 1, 1, 1, 1}) == 1 : "[5,1,1,1,1] single big jump should return 1";

        System.out.println("All tests passed!");
    }
}
