import { useState } from 'react'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount
} from '../../store/features/counter/counterSlice.ts'
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";

function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  return (
   <div>
     <div>
       <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
       >
         +
       </button>
       <span>{count}</span>
       <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
       >
         -
       </button>
     </div>
     <div>
       <input
        aria-label="Set increment amount"
        value={incrementAmount}
        onChange={e => setIncrementAmount(e.target.value)}
       />
       <button
        onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}
       >
         Add Amount
       </button>
       <button
        onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
       >
         Add Async
       </button>
     </div>
   </div>
  )
}

export default Counter
