import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Card, Row, Input, Avatar, Col, Button} from 'antd';
import '../less/app.less'

const {Meta} = Card;

class Item extends Component {
    constructor() {
        super();
        this.state = {
            array: [
                {count: 0, index: 0, barcode: '', name: ''},
                {count: 0, index: 1, barcode: '', name: ''},
                {count: 0, index: 2, barcode: '', name: ''},
                {count: 0, index: 3, barcode: '', name: ''},
                {count: 0, index: 4, barcode: '', name: ''},
                {count: 0, index: 5, barcode: '', name: ''}
            ]
        }
    }

    add(index, item) {
       const array = this.state.array.map(ele => {
            if (ele.index === index) {
                ele.count = ele.count + 1;
                ele.barcode = item.barcode;
                ele.name = item.name
            }
            return ele;
        });
        this.setState({array})
    }

    reduce(index) {
        const array = this.state.array.map(ele => {
            if (ele.index === index) {
                ele.count > 0 ? ele.count = ele.count - 1 : 0;
            }
            return ele;
        });
        this.setState({array})

    }

    toShopCart() {
        this.props.toShopCart();
        this.state.array.map(ele => {
            if (ele.count > 0) {
                this.props.shopCart.push({
                    barcode: ele.barcode,
                    name: ele.name,
                    count: ele.count
                });
            }
        });
    }


    render() {
        const items = this.props.item;
        const itemList = items.map((item, index) => {
            const count = this.state.array.filter(s => s.index === index)[0].count
            return <Col key={index} span={6} className='card'>
                <Card
                    actions={
                        [<p className='vertical-center'>请添加要购买的数量</p>,
                            <Row className='vertical-center'>
                                <Col span={4} offset={1}>
                                    <Button size={'small'} onClick={this.reduce.bind(this, index)}>-</Button>
                                </Col>
                                <Col span={14}>
                                    <Input size={'small'} defaultValue={0} value={count}/>
                                </Col>
                                <Col span={4}>
                                    <Button size={'small'} onClick={this.add.bind(this, index, item)}>+</Button>
                                </Col>
                            </Row>
                        ]}>
                    <Meta avatar={<Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1iOuWL8xOLn7ClsREqz9qRaYG9I047pE3Vb6S1lTpI8hgxJN7"/>}
                          title={item.name}
                          description={`单位 : ${item.unit}`}
                    />
                </Card>
            </Col>
        });

        return (
            <div>
                {itemList}
                <Button className='btn-buy' onClick={this.toShopCart.bind(this)}>我的购物车</Button>
            </div>

        );
    }
}

export default (Item);
