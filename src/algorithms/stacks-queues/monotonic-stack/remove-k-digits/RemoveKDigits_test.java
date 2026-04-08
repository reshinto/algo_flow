// javac RemoveKDigits.java RemoveKDigits_test.java && java -ea RemoveKDigits_test
public class RemoveKDigits_test {
    public static void main(String[] args) {
        assert RemoveKDigits.removeKDigits("1432219", 3).equals("1219");
        assert RemoveKDigits.removeKDigits("10200", 1).equals("200");
        assert RemoveKDigits.removeKDigits("10", 2).equals("0");
        assert RemoveKDigits.removeKDigits("12345", 0).equals("12345");
        assert RemoveKDigits.removeKDigits("100", 1).equals("0");
        assert RemoveKDigits.removeKDigits("9", 1).equals("0");
        assert RemoveKDigits.removeKDigits("12345", 3).equals("12");
        assert RemoveKDigits.removeKDigits("1111111", 3).equals("1111");
        assert RemoveKDigits.removeKDigits("9876", 2).equals("76");
        assert RemoveKDigits.removeKDigits("12345", 5).equals("0");

        System.out.println("All tests passed!");
    }
}
