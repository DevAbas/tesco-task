import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

type ExchangeRateData = {
  USD: number;
};

type ResponseTimeData = {
  minimum: number;
  average: number;
  maximum: number;
};

type ExchangeRateProps = {
  email: string;
};

export default function ExchangeRate({ email }: ExchangeRateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [prevExchangeRate, setPrevExchangeRate] = useState(0);
  const [exchangeRateColor, setExchangeRateColor] = useState("black");

  useEffect(() => {
    const interval = setInterval(fetchExchangeRate, 12000);
    return () => clearInterval(interval);
  }, []);

  const fetchExchangeRate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=d32b76983f7071f00f7e3e1257b6f9b00a323c3dcd7ec1cd95ac0c456f8eafbc"
      );
      const data: ExchangeRateData = await response.json();
      setIsLoading(false);
      setError(null);
      const newExchangeRate = data.USD;
      setPrevExchangeRate(exchangeRate);
      setExchangeRate(newExchangeRate);
      if (newExchangeRate > prevExchangeRate) {
        setExchangeRateColor("green");
      } else if (newExchangeRate < prevExchangeRate) {
        setExchangeRateColor("red");
      } else {
        setExchangeRateColor("black");
      }
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred while fetching the exchange rate.");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <div className={styles.exchangeRateWrapper}>
          <p className={styles.exchangeRateHeading}>Exchange rate</p>
          <strong>{exchangeRate}</strong>
        </div>
      </div>
    </main>
  );
}
