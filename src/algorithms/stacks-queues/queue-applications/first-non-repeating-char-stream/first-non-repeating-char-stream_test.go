package main

import (
	"reflect"
	"testing"
)

func TestFirstNonRepeatingCharStreamDefault(t *testing.T) {
	expected := []string{"a", "#", "b", "b", "c", "#", "d"}
	if !reflect.DeepEqual(firstNonRepeatingCharStream("aabcbcd"), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestFirstNonRepeatingCharStreamSingle(t *testing.T) {
	if !reflect.DeepEqual(firstNonRepeatingCharStream("z"), []string{"z"}) {
		t.Errorf("expected [z]")
	}
}

func TestFirstNonRepeatingCharStreamAllRepeating(t *testing.T) {
	expected := []string{"a", "#", "b", "#"}
	if !reflect.DeepEqual(firstNonRepeatingCharStream("aabb"), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestFirstNonRepeatingCharStreamAllDistinct(t *testing.T) {
	expected := []string{"a", "a", "a", "a"}
	if !reflect.DeepEqual(firstNonRepeatingCharStream("abcd"), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestFirstNonRepeatingCharStreamTwoIdentical(t *testing.T) {
	if !reflect.DeepEqual(firstNonRepeatingCharStream("aa"), []string{"a", "#"}) {
		t.Errorf("expected [a #]")
	}
}

func TestFirstNonRepeatingCharStreamEvictsAba(t *testing.T) {
	if !reflect.DeepEqual(firstNonRepeatingCharStream("aba"), []string{"a", "a", "b"}) {
		t.Errorf("expected [a a b]")
	}
}

func TestFirstNonRepeatingCharStreamEmpty(t *testing.T) {
	result := firstNonRepeatingCharStream("")
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}
