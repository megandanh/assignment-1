// Endpoint for querying the fibonacci numbers

import { Request, Response } from "express";
import fibonacci from "./fib";

export default (req: Request<{ num?: string }>, res: Response): void => {
  let numStr="";

  if (typeof req.params.num === "string") {
    numStr = req.params.num;
  }

  const n = Number.parseInt(numStr, 10);

  // allow negative integers so fibonacci can decide "undefined" for negatives
  if (Number.isNaN(n) || !Number.isInteger(n)) {
    res.status(400).send("Invalid input");
    return;
  }

  const fib = fibonacci as (x: number) => number | undefined;
  const fibN = fib(n);
  let result = `fibonacci(${n}) is ${String(fibN)}`;

  if (typeof fibN !== "number" || fibN < 0) {
    result = `fibonacci(${n}) is undefined`;
  }
  res.send(result);
};