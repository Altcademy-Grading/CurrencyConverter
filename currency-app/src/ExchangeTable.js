import React from "react";

export default function ExchangeTable(props) {
  const { currencyOptions, exchangeRate } = props;

  return (
    <>
      <td value={currencyOptions}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </td>
      <td>1</td>
    </>
  );
}
