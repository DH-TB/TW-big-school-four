import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Card, Row, Input, Avatar, Col, Layout, Button, message} from 'antd';
import '../less/app.less'
import * as action from '../actions/receipt';

const {Meta} = Card;
const {Header, Content} = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            array: [
                {value: 0, index: 0, barcode: ''},
                {value: 0, index: 1, barcode: ''},
                {value: 0, index: 2, barcode: ''},
                {value: 0, index: 3, barcode: ''},
                {value: 0, index: 4, barcode: ''},
                {value: 0, index: 5, barcode: ''}
            ]
        }
    }

    componentDidMount() {
        this.props.getItem();
    }

    add(index, barcode) {
        const array = this.state.array.map(ele => {
            if (ele.index === index) {
                ele.value = ele.value + 1;
                ele.barcode = barcode;
            }
            return ele;
        });
        this.setState({array: array})
    }

    reduce(index, barcode) {
        const array = this.state.array.map(ele => {
            if (ele.index === index) {
                ele.value > 0 ? ele.value = ele.value - 1 : 0;
                ele.barcode = barcode;
            }
            return ele;
        });
        this.setState({array: array})
    }

    buy() {
        const array = [];
        this.state.array.map(ele => {
            if (ele.value > 0) {
                array.push(`${ele.barcode}-${ele.value}`)
            }
        });
        array.length === 0 ? message.warning('请添加要购买的商品') : this.props.getReceipt(array);
    }

    render() {
        const items = this.props.item;
        const receipt = this.props.receipt[0] || '';
        const item = items.map((item, index) => {
            return <Col key={index} span={6} className='card'>
                <Card
                    actions={
                        [<p className='vertical-center'>请添加要购买的数量</p>,
                            <Row className='vertical-center'>
                                <Col span={4} offset={1}>
                                    <Button size={'small'}
                                            onClick={this.reduce.bind(this, index, item.barcode)}>-</Button>
                                </Col>
                                <Col span={14}>
                                    <Input size={'small'} defaultValue={0}
                                           value={this.state.array.filter(s => s.index === index)[0].value}/>

                                </Col>
                                <Col span={4}>
                                    <Button size={'small'} onClick={this.add.bind(this, index, item.barcode)}>+</Button>
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
        return (
            <Layout>
                <Header className='header'>商品列表</Header>
                <Content className='content'>
                    {item}
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
