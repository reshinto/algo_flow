/** Correctness tests for the RunLengthDecoding algorithm. */
public class RunLengthDecoding_test {
    public static void main(String[] args) {
        assert RunLengthDecoding.runLengthDecoding("3a2b4c").equals("aaabbcccc");
        assert RunLengthDecoding.runLengthDecoding("1a1b1c").equals("abc");
        assert RunLengthDecoding.runLengthDecoding("").equals("");
        assert RunLengthDecoding.runLengthDecoding("1z").equals("z");
        assert RunLengthDecoding.runLengthDecoding("5x").equals("xxxxx");
        assert RunLengthDecoding.runLengthDecoding("2a3b1c").equals("aabbbc");
        assert RunLengthDecoding.runLengthDecoding("10a").equals("aaaaaaaaaa");
        assert RunLengthDecoding.runLengthDecoding("2a2a").equals("aaaa");
        assert RunLengthDecoding.runLengthDecoding("3A2B").equals("AAABB");
        System.out.println("All tests passed!");
    }
}
