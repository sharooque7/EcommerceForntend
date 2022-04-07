import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();
  useEffect(() => {
    const Interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect when count === 0
    count === 0 && history.push("/");

    //cleanup funtion
    return () => clearInterval(Interval);
  }, [count, history]);

  return (
    <div className="conatainer p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
