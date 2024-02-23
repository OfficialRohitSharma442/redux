import { createStore, applyMiddleware } from 'redux';
import axios from 'axios'
import logger from 'redux-logger'
import { thunk } from 'redux-thunk';

const increment = "increment";
const decrement = "decrement";
const incrementByAmount = "incrementByAmount"
const init = "init"
let history = [];
const store = createStore(reducer, applyMiddleware(logger.default, thunk));

// Reducer
function reducer(state, action) {


    switch (action.type) {
        case init:
            return { amount: action.payload }
        case increment:
            return { amount: state.amount + 1 }
        case decrement:
            return { amount: state.amount - 1 }
        case incrementByAmount:
            return { amount: state.amount + action.payload }
        default:
            return state;
    }


}
// store.subscribe(() => {
//     history.push(store.getState())
//     console.log(history)
// })

// async API call 

async function GetUsers() {

    // console.log(data);
}
// GetUsers()

// Action Creaters

function GetUser(id) {
    return async (dispatch, getState) => {
        try {
            let { data } = await axios.get(`http://localhost:3000/accounts/${id}`)
            dispatch(initUser({ payload: data }));
        } catch (error) {
            console.log(error);
        }
    }
}
function initUser({ payload }) {
    return { type: init, payload: payload }
}

function Increment() {
    return { type: increment }
}
function Decrement() {
    return { type: decrement }
}

function IncrementByAmount(payload) {
    return { type: incrementByAmount, payload: payload }
}
// setInterval(() => {
// store.dispatch(increment());
// store.dispatch(IncrementByAmount(3));
store.dispatch(GetUser(1));
store.getState()
// store.dispatch(decrement());
// }, 5000);

// console.log()