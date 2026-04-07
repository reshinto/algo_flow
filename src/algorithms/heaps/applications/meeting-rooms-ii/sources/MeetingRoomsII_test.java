public class MeetingRoomsII_test {
    public static void main(String[] args) {
        assert MeetingRoomsII.meetingRoomsII(new int[][]{{0,30},{5,10},{15,20}}) == 2 : "Test 1 failed";
        assert MeetingRoomsII.meetingRoomsII(new int[][]{{0,30},{5,10},{15,20},{2,7}}) == 3 : "Test 2 failed";
        assert MeetingRoomsII.meetingRoomsII(new int[][]{{0,5},{5,10},{10,15}}) == 1 : "Test 3 failed";
        assert MeetingRoomsII.meetingRoomsII(new int[][]{{0,100},{1,99},{2,98}}) == 3 : "Test 4 failed";
        assert MeetingRoomsII.meetingRoomsII(new int[][]{}) == 0 : "Test 5 failed";
        assert MeetingRoomsII.meetingRoomsII(new int[][]{{0,30}}) == 1 : "Test 6 failed";
        assert MeetingRoomsII.meetingRoomsII(new int[][]{{15,20},{5,10},{0,30}}) == 2 : "Test 7 failed";
        assert MeetingRoomsII.meetingRoomsII(new int[][]{{0,10},{10,20},{10,30}}) == 2 : "Test 8 failed";
        assert MeetingRoomsII.meetingRoomsII(new int[][]{{0,5},{0,5}}) == 2 : "Test 9 failed";
        System.out.println("All tests passed!");
    }
}
