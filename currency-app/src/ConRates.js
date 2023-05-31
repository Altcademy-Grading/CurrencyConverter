import React from "react";

export default function ConRates(props) {
  const { setToCurrency } = props;

  return (
    <>
      <tr>
        <th scope="row2">
          <td value={setToCurrency}>
            {setToCurrency.map((option) => (
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
