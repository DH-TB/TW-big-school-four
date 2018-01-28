import * as request from '../constant/request';

export const getItemData = (item)=>{
    return {
        type:'GET_ITEM_DATA',
        item
    }
};

export const getReceiptText = (receipt)=>{
    return {
        type:'GET_RECEIPT_TEXT',
        receipt
    }
};

export const getItem = () => {
    return dispatch => {
        (async () => {
            const res = await request.get('../api/item');
            if (res.status === 200) {
                dispatch(getItemData(res.body))
            }
        })()
    }
};


export const getReceipt = (item) => {
    return dispatch => {
        (async () => {
            const res = await request.post('../api/receipt',item);
            if (res.status === 200) {
                console.log(res.body)
                dispatch(getReceiptText(res.body))
            }
        })()
    }
};
