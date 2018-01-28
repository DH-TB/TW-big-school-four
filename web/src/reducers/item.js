export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ITEM_DATA':
            return action.item;
        default:
            return state
    }
}
