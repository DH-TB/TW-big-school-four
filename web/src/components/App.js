import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Layout, Menu} from 'antd';
import '../less/app.less'
import * as action from '../actions/receipt';
import Item from './Item';
import ShopCart from './ShopCart';

const {Header, Content} = Layout;

class App extends Component {
    constructor() {
        super();
        this.state = {
            selectId: 1,
            shopCart: [],
        }
    }

    componentDidMount() {
        this.props.getItem();
    }

    toShopCart(){
        const itemState = this.refs.item.state;
        itemState.array.map(ele => {
            if (ele.count > 0) {
                this.state.shopCart.push({
                    barcode: ele.barcode,
                    name: ele.name,
                    count: ele.count
                });
            }
        });
        this.setState({selectId: 2})
    }

    toItemList(){
        this.setState({selectId: 1});
    }


    render() {
        const item = this.props.item;
        const receipt = this.props.receipt[0] || '';
        return (
            <Layout>
                <Header className='header'>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1"><a onClick={this.toItemList.bind(this)}>商品列表</a></Menu.Item>
                        <Menu.Item key="2"><a onClick={this.toShopCart.bind(this)}>购物车</a></Menu.Item>
                    </Menu>
                </Header>
                <Content className='content'>
                    {this.state.selectId === 1 ?
                        <Item item={item}
                              ref='item'
                              shopCart={this.state.shopCart}
                              toShopCart={this.toShopCart.bind(this)}
                        />
                         :
                        <ShopCart receipt={receipt}
                                  shopCart={this.state.shopCart}
                                  toItemList={this.toItemList.bind(this)}
                                  getReceipt={this.props.getReceipt}
                        />
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
