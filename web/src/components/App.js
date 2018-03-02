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

    buy() {
        const array = [];
        this.state.array.map(ele => {
            if (ele.count > 0) {
                this.state.shopCart.push(ele);
                array.push(`${ele.barcode}-${ele.count}`)
            }
        });
        this.setState({array});
        array.length === 0 ? message.warning('请添加要购买的商品') : this.props.getReceipt(array);
    }

    render() {
        const items = this.props.item;
        const receipt = this.props.receipt[0] || '';
        const itemList = items.map((item, index) => {
            return <Col key={index} span={6} className='card'>
                <Card
                    actions={
                        [<p className='vertical-center'>请添加要购买的数量</p>,
                            <Row className='vertical-center'>
                                <Col span={4} offset={1}>
                                    <Button size={'small'}
                                            onClick={this.reduce.bind(this, index)}>-</Button>
                                </Col>
                                <Col span={14}>
                                    <Input size={'small'} defaultValue={0}
                                           value={this.state.array.filter(s => s.index === index)[0].count}/>

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
        console.log(this.state.array);
        const array = [];
        this.state.array.map(ele => {
            if (ele.count > 0) {
                this.state.shopCart.push(ele);
                array.push(`${ele.barcode}-${ele.count}`)
            }
        });
        const shopCart = ["ITEM000000-2", "ITEM000001-3", "ITEM000005-1"];
        // const shop = this.state.array.map((e, index) => {
        //     const columns = [
        //         {
        //             title: '名称',
        //             dataIndex: 'title',
        //             key: '1',
        //         },
        //         {
        //             title: '数量',
        //             dataIndex: 'count',
        //             key: '2',
        //         }];
        //     return (
        //         <Table columns={columns}
        //                dataSource={data}
        //                rowKey={record => record.id}
        //                pagination={false}
        //         />
        //     )
        // });

        return (
            <Layout>
                <Header className='header'>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><a onClick={e => this.setState({selectId: 1})}>商品列表</a></Menu.Item>
                        <Menu.Item key="2"><a onClick={e => this.setState({selectId: 2})}>购物车</a></Menu.Item>
                    </Menu>
                </Header>
                <Content className='content'>
                    {this.state.selectId === 1 ? itemList : shopCart}
                </Content>
                <Button className='btn-buy' onClick={this.buy.bind(this)}>确认购买</Button>
                <div className='receipt'>
                    {receipt}
                </div>
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
        getReceipt: (item) => dispatch(action.getReceipt(item))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
