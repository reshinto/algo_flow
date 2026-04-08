package main

import "testing"

func TestHappyNumber_Identifies19AsHappy(t *testing.T) {
	if !happyNumber(19) {
		t.Error("expected true for 19")
	}
}

func TestHappyNumber_Identifies1AsHappy(t *testing.T) {
	if !happyNumber(1) {
		t.Error("expected true for 1")
	}
}

func TestHappyNumber_Identifies7AsHappy(t *testing.T) {
	if !happyNumber(7) {
		t.Error("expected true for 7")
	}
}

func TestHappyNumber_Identifies4AsNotHappy(t *testing.T) {
	if happyNumber(4) {
		t.Error("expected false for 4")
	}
}

func TestHappyNumber_Identifies2AsNotHappy(t *testing.T) {
	if happyNumber(2) {
		t.Error("expected false for 2")
	}
}

func TestHappyNumber_Identifies100AsHappy(t *testing.T) {
	if !happyNumber(100) {
		t.Error("expected true for 100")
	}
}

func TestHappyNumber_Identifies116AsNotHappy(t *testing.T) {
	if happyNumber(116) {
		t.Error("expected false for 116")
	}
}

func TestHappyNumber_Identifies89AsNotHappy(t *testing.T) {
	if happyNumber(89) {
		t.Error("expected false for 89")
	}
}
