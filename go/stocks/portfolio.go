package stocks

import "errors"

type Portfolio []Money

func (p Portfolio) Add(money Money) Portfolio {
	p = append(p, money)
	return p
}

func (p Portfolio) Evaluate(bank Bank, currency string) (*Money, error) {
	/* 对于每个Money结构体：
	 *    试着用convert方法把Money转换为目标货币，并将转换后的金额记入总额
	 *        如果convert出现了故障：
	 *            那么把这次故障所涉及的来源货币与目标货币这两个要素提取出来。
	 * 如果始终没有遇到故障：
	 *    那么返回一个以目标货币为币种，以总额为金额的Money对象；并且返回nil作为错误，以表示Evaluate方法执行无误。
	 * 否则：
	 *    返回一个空白的Money结构体，并返回一条错误消息；把执行过程中遇到的各种故障全都写在这条消息里。
	 */
	total := 0.0
	failedConversions := make([]string, 0)
	for _, m := range p {
		// 转换目标货币
		if convertedCurrency, err := bank.Convert(m, currency); err == nil {
			total = total + convertedCurrency.amount
		} else {
			failedConversions = append(failedConversions, err.Error())
		}
	}
	if len(failedConversions) == 0 {
		totalMoney := NewMoney(total, currency)
		return &totalMoney, nil
	}
	failures := createFailureMessage(failedConversions)
	return nil, errors.New("Missing exchange rate(s):" + failures)
}

func createFailureMessage(failedConversions []string) string {
	failures := "["
	for _, f := range failedConversions {
		failures = failures + f + ","
	}
	failures = failures + "]"
	return failures
}
