import store, {RootState} from "../../../store";

const selectCounterValue = (state: RootState) => state.value;

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
