import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios'
import logger from 'redux-logger'
import { thunk } from 'redux-thunk';

const increment = "account/increment";
const decrement = "account/decrement";
const incrementByAmount = "account/incrementByAmount";
const incrementBonus = "bonus/incrementBonus";
const init = "init"
const getAccountUserPending = "account/GetUser/pending"
const getAccountUserFullfilled = "account/GetUser/fulfilled"
const getAccountUserRejected = "account/GetUser/rejectd"
let history = [];
const store = createStore(combineReducers({
    account: accountsReducer,
    bonus: BonusReducer
}), applyMiddleware(logger.default, thunk));
//BonusReducer, accountsReducer
// Reducer
function accountsReducer(state = { amount: 0 }, action) {
    switch (action.type) {
        case getAccountUserFullfilled:
            return { amount: action.payload, pending: false }
        case getAccountUserRejected:
            return { ...state, error: action.error, pending: false }
        case getAccountUserPending:
            return { ...state, pending: true }
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
function BonusReducer(state = { point: 0 }, action) {
    switch (action.type) {
        case incrementBonus:
            return { amount: state.point + 1 }
        case incrementByAmount:
            if (action.payload >= 100)
                return { amount: state.point + 1 }
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

function GetUserAccount(id) {
    return async (dispatch, getState) => {
        try {
            store.dispatch(GetAccountUserPending());
            const { data } = await axios.get(`http://localhost:3000/accounts/${id}`)
            dispatch(GetAccountUserFullfilled(data.amount));
        } catch (error) {
            // console.log(error)
            dispatch(GetAccountUserRejected(error.message));
        }
    }
}
function GetAccountUserFullfilled(payload) {
    return { type: getAccountUserFullfilled, payload: payload }
}
function GetAccountUserRejected(error) {
    return { type: getAccountUserRejected, error: error }
}
function GetAccountUserPending() {
    return { type: getAccountUserPending }
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

// Bonus Actions Creaters

function IncrementBonus() {
    return { type: incrementBonus }
}
// setInterval(() => {
// store.dispatch(initUser(100));
store.dispatch(GetUserAccount(1));
// store.getState()
// store.dispatch(decrement());

// store.dispatch(IncrementBonus());
// }, 1000);
// console.log()