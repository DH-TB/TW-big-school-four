import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Card, Row, Input, Avatar, Col, Layout, Button, Menu, Table, message} from 'antd';
import '../less/app.less'
import * as action from '../actions/receipt';

const {Meta} = Card;
const {Header, Content} = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            selectId: 1,
            shopCart: [],
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

    componentDidMount() {
        this.props.getItem();
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
        this.setState({array: array})
    }

    reduce(index) {
        const array = this.state.array.map(ele => {
            if (ele.index === index) {
                ele.count > 0 ? ele.count = ele.count - 1 : 0;
            }
            return ele;
        });
        this.setState({array: array})
    }

    toShopCart(){
        this.setState({selectId: 2});
        this.state.array.map(ele => {
            if (ele.count > 0) {
                this.state.shopCart.push({
                    barcode:ele.barcode,
                    name:ele.name,
                    count:ele.count
                });
            }
        });
    }

    buy() {
        const shopCart = this.state.shopCart.map(ele => `${ele.barcode}-${ele.count}`);
        if(shopCart.length === 0){
            message.warning('请添加要购买的商品');
            this.setState({selectId: 1});
        }
        else{
            this.props.getReceipt(shopCart);
        }
    }

    render() {
        const items = this.props.item;
        const receipt = this.props.receipt[0] || '';

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
                    <Meta avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                          title={item.name}
                          description={`单位 : ${item.unit}`}
                    />
                </Card>
            </Col>
        });

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
            <Layout>
                <Header className='header'>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><a onClick={e => this.setState({selectId: 1})}>商品列表</a></Menu.Item>
                        <Menu.Item key="2"><a onClick={e => this.setState({selectId: 2})}>购物车</a></Menu.Item>
                    </Menu>
                </Header>
                <Content className='content'>
                    {this.state.selectId === 1 ?
                        <div>
                            {itemList}
                            <Button className='btn-buy' onClick={this.toShopCart.bind(this)}>我的购物车</Button>
                        </div>
                         :
                        <div>
                            <Table columns={columns}
                                   dataSource={this.state.shopCart}
                                   rowKey={record => record.id}
                                   pagination={false}
                            />

                            <Button className='btn-buy' onClick={this.buy.bind(this)}>确认购买</Button>
                            <div className='receipt'>
                                {receipt}
                            </div>
                        </div>

                        }
                </Content>

            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.item,
        receipt: state.receipt
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItem: () => dispatch(action.getItem()),
        getReceipt: (shopCart) => dispatch(action.getReceipt(shopCart))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
