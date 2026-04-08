// javac BackspaceStringCompare.java BackspaceStringCompare_test.java && java -ea BackspaceStringCompare_test
public class BackspaceStringCompare_test {
    public static void main(String[] args) {
        assert BackspaceStringCompare.backspaceStringCompare("ab#c", "ad#c") == true;
        assert BackspaceStringCompare.backspaceStringCompare("ab##", "c#d#") == true;
        assert BackspaceStringCompare.backspaceStringCompare("a#c", "b") == false;
        assert BackspaceStringCompare.backspaceStringCompare("", "") == true;
        assert BackspaceStringCompare.backspaceStringCompare("a", "a") == true;
        assert BackspaceStringCompare.backspaceStringCompare("abc", "a") == false;
        assert BackspaceStringCompare.backspaceStringCompare("#a", "a") == true;
        assert BackspaceStringCompare.backspaceStringCompare("nzp#o#g", "b#nzp#o#g") == true;

        System.out.println("All tests passed!");
    }
}
