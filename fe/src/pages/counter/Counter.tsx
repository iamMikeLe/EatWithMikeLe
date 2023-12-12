import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
} from "./counterSlice";

// Material Dashboard 2 PRO React TS components
import Box from "components/Box";

import DashboardLayout from "layouts/DashboardLayout";
import DashboardNavbar from "layouts/DashboardNavbar";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box mb={2} />
      <Box position="relative" mb={5}>
        <div>
          <div>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              -
            </button>
            <span>{count}</span>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              +
            </button>
          </div>
          <div>
            <input
              aria-label="Set increment amount"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
            />
            <button onClick={() => dispatch(incrementByAmount(incrementValue))}>
              Add Amount
            </button>
            <button onClick={() => dispatch(incrementIfOdd(incrementValue))}>
              Add If Odd
            </button>
          </div>
        </div>
      </Box>
    </DashboardLayout>
  );
}
