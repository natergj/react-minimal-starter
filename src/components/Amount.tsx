import * as React from "react";

type AmountProps = {
  num: number;
};
const Amount = React.memo((props: AmountProps) => {
  const wholeUnit = Math.floor(props.num);
  const decimalUnit = props.num % 1;

  let closest = 0;
  if (decimalUnit > 0) {
    for (let i = 0; i <= 16; i++) {
      if (Math.abs(decimalUnit - closest) <= i / 16) {
        closest = i;
      }
    }
  }
  let fraction = reduceFraction(closest, 16);
  if (decimalUnit > 0) {
    for (let i = 0; i <= 3; i++) {
      if (
        Math.abs(decimalUnit - fraction[0] / fraction[1]) >
        Math.abs(decimalUnit - i / 3)
      ) {
        fraction = reduceFraction(i, 3);
      }
    }
  }

  const wholeUnitStr = wholeUnit > 0 ? wholeUnit.toString() : "";
  if (closest > 0) {
    const numerator = fraction[0].toString();
    const denominator = fraction[1].toString();
    return (
      <div>
        {wholeUnitStr}
        <div style={{ fontSize: ".6em", transform: "translate(0, -.2em)" }}>
          <sup>{numerator}</sup>/<sub>{denominator}</sub>
        </div>
      </div>
    );
  }

  return <div>{wholeUnitStr}</div>;
});

function reduceFraction(numerator: number, denominator: number) {
  const gcd = getGreatestCommonDenominator(numerator, denominator);
  return [numerator / gcd, denominator / gcd];
}

function getGreatestCommonDenominator(a: number, b: number): number {
  return b ? getGreatestCommonDenominator(b, a % b) : a;
}

export default Amount;
