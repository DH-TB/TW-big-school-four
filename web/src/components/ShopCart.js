import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Button, Table, message} from 'antd';
import '../less/app.less'

class ShopCart extends Component {
    buy() {
        const shopCart = this.props.shopCart.map(ele => `${ele.barcode}-${ele.count}`);
        if(shopCart.length === 0){
            message.warning('请添加要购买的商品');
            this.props.toItemList();
        }
        else{
            this.props.getReceipt(shopCart);
        }
    }

    render() {
        const receipt = this.props.receipt;

        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: '1',
            },
            {
                title: '数量',
                dataIndex: 'count',
                key: '2',
            }];

        return (
            <div>
                <Table columns={columns}
                       dataSource={this.props.shopCart}
                       rowKey={record => record.barcode}
                       pagination={false}
                />
                <Button className='btn-buy' onClick={this.buy.bind(this)}>确认购买</Button>
                <pre className='receipt'>
                    {receipt}
                </pre>
            </div>
        );
    }
}

export default (ShopCart);
