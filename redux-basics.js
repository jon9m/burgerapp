//test file - execute  - node redux-basics.js

const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

//Reducer
const rootReducer = (state = initialState, action) => {    //state = initialState - set default value to state
    if (action.type === 'INC_COUNTER') {
        return {    //Update state immutabally
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type === 'ADD_COUNTER') {
        return {    //Update state immutabally
            ...state,
            counter: state.counter + action.value  //vallue property defined below
        };
    }

    return state;
}

// Store
const store = createStore(rootReducer);
console.log(store.getState());

//Subscription - will be notified any future dispatches
store.subscribe(() => {
    console.log('[Subscription] ', store.getState());
});

//Dispatch action
store.dispatch({ type: 'INC_COUNTER' });  //Takes an argument (Action) js object must have 'type' property 
store.dispatch({ type: 'ADD_COUNTER', value: 10 });  //any number of key values
console.log(store.getState());