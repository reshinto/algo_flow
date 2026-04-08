public class HappyNumber_test {
    public static void main(String[] args) {
        assert HappyNumber.happyNumber(19) == true;
        assert HappyNumber.happyNumber(1) == true;
        assert HappyNumber.happyNumber(7) == true;
        assert HappyNumber.happyNumber(4) == false;
        assert HappyNumber.happyNumber(2) == false;
        assert HappyNumber.happyNumber(100) == true;
        assert HappyNumber.happyNumber(116) == false;
        assert HappyNumber.happyNumber(89) == false;

        System.out.println("All tests passed!");
    }
}
