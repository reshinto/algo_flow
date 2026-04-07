package main

import (
	"reflect"
	"testing"
)

func TestGenerateBinaryNumbersFive(t *testing.T) {
	expected := []string{"1", "10", "11", "100", "101"}
	if !reflect.DeepEqual(generateBinaryNumbers(5), expected) {
		t.Errorf("expected %v", expected)
	}
}

func TestGenerateBinaryNumbersOne(t *testing.T) {
	if !reflect.DeepEqual(generateBinaryNumbers(1), []string{"1"}) {
		t.Errorf("expected [1]")
	}
}

func TestGenerateBinaryNumbersThree(t *testing.T) {
	if !reflect.DeepEqual(generateBinaryNumbers(3), []string{"1", "10", "11"}) {
		t.Errorf("expected [1 10 11]")
	}
}

func TestGenerateBinaryNumbersZero(t *testing.T) {
	result := generateBinaryNumbers(0)
	if len(result) != 0 {
		t.Errorf("expected empty slice")
	}
}

func TestGenerateBinaryNumbersFifteenCount(t *testing.T) {
	if len(generateBinaryNumbers(15)) != 15 {
		t.Errorf("expected length 15")
	}
}

func TestGenerateBinaryNumbersLastForFour(t *testing.T) {
	result := generateBinaryNumbers(4)
	if result[len(result)-1] != "100" {
		t.Errorf("expected last element '100'")
	}
}
