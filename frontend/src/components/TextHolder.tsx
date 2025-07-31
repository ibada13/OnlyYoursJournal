import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TextHolderInterface {
  text: string;

}

const TextHolder = ({ text }: TextHolderInterface) => {
  const [seconds, setSeconds] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div  className="w-screen h-screen flex flex-col justify-center items-center bg-bg">
      <h1 className="text-6xl text-accent mb-4">{text}</h1>
      <p className="text-lg text-fg">Redirecting you to Home in {seconds}...</p>
    </div>
  );
};

export default TextHolder;
