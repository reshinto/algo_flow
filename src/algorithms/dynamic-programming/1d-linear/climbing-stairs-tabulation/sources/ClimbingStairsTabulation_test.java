// javac ClimbingStairsTabulation.java ClimbingStairsTabulation_test.java && java -ea ClimbingStairsTabulation_test
public class ClimbingStairsTabulation_test {
    public static void main(String[] args) {
        assert ClimbingStairsTabulation.climbingStairsTabulation(0) == 1 : "0 stairs should return 1";
        assert ClimbingStairsTabulation.climbingStairsTabulation(1) == 1 : "1 stair should return 1";
        assert ClimbingStairsTabulation.climbingStairsTabulation(2) == 2 : "2 stairs should return 2";
        assert ClimbingStairsTabulation.climbingStairsTabulation(3) == 3 : "3 stairs should return 3";
        assert ClimbingStairsTabulation.climbingStairsTabulation(4) == 5 : "4 stairs should return 5";
        assert ClimbingStairsTabulation.climbingStairsTabulation(6) == 13 : "6 stairs should return 13";
        assert ClimbingStairsTabulation.climbingStairsTabulation(7) == 21 : "7 stairs should return 21";

        System.out.println("All tests passed!");
    }
}
