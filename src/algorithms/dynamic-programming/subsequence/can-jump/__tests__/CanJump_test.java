// javac CanJump.java CanJump_test.java && java -ea CanJump_test
public class CanJump_test {
    public static void main(String[] args) {
        assert CanJump.canJump(new int[]{2, 3, 1, 1, 4}) == true : "[2,3,1,1,4] should return true";
        assert CanJump.canJump(new int[]{3, 2, 1, 0, 4}) == false : "[3,2,1,0,4] should return false";
        assert CanJump.canJump(new int[]{0}) == true : "[0] single element should return true";
        assert CanJump.canJump(new int[]{1, 2}) == true : "[1,2] should return true";
        assert CanJump.canJump(new int[]{0, 1}) == false : "[0,1] blocked at start should return false";
        assert CanJump.canJump(new int[]{5, 0, 0, 0, 0, 1}) == true : "[5,0,0,0,0,1] long jump should return true";
        assert CanJump.canJump(new int[]{0, 0, 0}) == false : "[0,0,0] all zeros should return false";
        assert CanJump.canJump(new int[]{1, 0}) == true : "[1,0] one step to end should return true";

        System.out.println("All tests passed!");
    }
}
