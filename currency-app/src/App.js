import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ExchangeTable from "./ExchangeTable";
import CurrencyRow from "./CurrencyRow";
import ConRates from "./ConRates";

const url =
  "https://v6.exchangerate-api.com/v6/3ade1fb9d3897ad274da419c/latest/USD";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState([]);
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true); //lets us know which input field has been updated.



  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  //console.log(exchangeRate)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.conversion_rates)[1];
        setCurrencyOptions([...Object.keys(data.conversion_rates)]);
        setFromCurrency(data.base_code);
        setToCurrency(firstCurrency);
        setExchangeRate(data.conversion_rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${url}?base_code=${fromCurrency}&symblos=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.conversion_rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand mx-auto" href="#">
            The Currency Converter
          </a>
        </nav>
        <div className="container py-4">
          <div className="row">
            <div className="col-12 col-md-9">
              <h1 className="header">Exchange Rates</h1>
              <table className="table table-sm bg-light mt-4">
                <thead className="tableheader">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="text-right pr-4 py-2">
                      1.00 USD
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row1">
                      <ExchangeTable currencyOptions={currencyOptions} />
                    </th>
                    <th scope="row2">
                      <ConRates exchangeRate={exchangeRate} />
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-none d-md-block col-md-3">
              <div className="convert border border-primary py-4 px-3">
                <h1>Converter</h1>
                <CurrencyRow
                  currencyOptions={currencyOptions}
                  selectedCurrency={fromCurrency}
                  onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                  onChangeAmount={handleFromAmountChange}
                  amount={fromAmount}
                />
                <div className="equals"> = </div>
                <CurrencyRow
                  currencyOptions={currencyOptions}
                  selectedCurrency={toCurrency}
                  onChangeCurrency={(e) => setToCurrency(e.target.value)}
                  onChangeAmount={handleToAmountChange}
                  amount={toAmount}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="border-top p-2">
          This site was created by Otto Schiffhauer with the help of{" "}
          <a href="https://www.altcademy.com/">Altcademy</a>
        </div>
        <h4>
          View my other <a href="#">Works</a>
        </h4>
      </div>
    </>
  );
}

export default App;
