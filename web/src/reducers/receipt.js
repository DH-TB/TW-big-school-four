export default (state = [], action) => {
    switch (action.type) {
        case 'GET_RECEIPT_TEXT':
            return action.receipt;
        default:
            return state
    }
}
