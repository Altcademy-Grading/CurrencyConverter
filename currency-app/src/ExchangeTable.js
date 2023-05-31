import React from "react";

export default function ExchangeTable(props) {
  const { 
    currencyOptions, 
    exchangeRate,
   } = props;

  return (
    <>
      <tr>
        <th scope="row2">
          <td value={currencyOptions}>
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </td>
        </th>
      </tr>
    </>
  );
}
