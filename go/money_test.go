package main

import (
	"testing"
)

// 测试方法，必须以Test开头，并拥有一个*testing.T类型的参数
func TestMultiplication(t *testing.T) {
	// 表示5美元
	fiver := Dollar{
		amount: 5,
	}
	tenner := fiver.Times(2)
	if tenner.amount != 10 {
		t.Errorf("Expected 10, got: [%d]", tenner.amount)
	}
}

type Dollar struct {
	amount int
}

func (d Dollar) Times(multiplier int) Dollar {
	return Dollar{amount: d.amount * multiplier}
}
