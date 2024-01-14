const initialState = {value: 0}

type CounterAction = {
  type: string,
  payload: number
}

function counterReducer(state = initialState, action: CounterAction) {
    if(action.type === 'counter/INCREMENT') {
      return {
        ...state,
        value: state.value + 1
      }
    }
    return state
}

export default counterReducer;
