package heaps

import "testing"

func TestMeetingRoomsIIClassic(t *testing.T) {
	if meetingRoomsII([][2]int{{0, 30}, {5, 10}, {15, 20}}) != 2 {
		t.Error("Expected 2")
	}
}

func TestMeetingRoomsIIFourMeetings(t *testing.T) {
	if meetingRoomsII([][2]int{{0, 30}, {5, 10}, {15, 20}, {2, 7}}) != 3 {
		t.Error("Expected 3")
	}
}

func TestMeetingRoomsIISequential(t *testing.T) {
	if meetingRoomsII([][2]int{{0, 5}, {5, 10}, {10, 15}}) != 1 {
		t.Error("Expected 1")
	}
}

func TestMeetingRoomsIIAllOverlap(t *testing.T) {
	if meetingRoomsII([][2]int{{0, 100}, {1, 99}, {2, 98}}) != 3 {
		t.Error("Expected 3")
	}
}

func TestMeetingRoomsIIEmpty(t *testing.T) {
	if meetingRoomsII([][2]int{}) != 0 {
		t.Error("Expected 0")
	}
}

func TestMeetingRoomsIISingle(t *testing.T) {
	if meetingRoomsII([][2]int{{0, 30}}) != 1 {
		t.Error("Expected 1")
	}
}

func TestMeetingRoomsIIReverseOrder(t *testing.T) {
	if meetingRoomsII([][2]int{{15, 20}, {5, 10}, {0, 30}}) != 2 {
		t.Error("Expected 2")
	}
}

func TestMeetingRoomsIIEndEqualsStart(t *testing.T) {
	if meetingRoomsII([][2]int{{0, 10}, {10, 20}, {10, 30}}) != 2 {
		t.Error("Expected 2")
	}
}

func TestMeetingRoomsIITwoIdentical(t *testing.T) {
	if meetingRoomsII([][2]int{{0, 5}, {0, 5}}) != 2 {
		t.Error("Expected 2")
	}
}
