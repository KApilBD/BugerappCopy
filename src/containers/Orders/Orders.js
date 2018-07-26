import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true,
    // }

    componentDidMount(){
        this.props.onFetchOrders();
        // axios.get('/orders.json')
        // .then((res)=>{
        //     const fetchedOrders = [];
        //     for(let key in res.data){
        //         fetchedOrders.push({
        //             ...res.data[key],
        //             id:key,
        //         });
        //     }
        //     this.setState({loading: false, orders: fetchedOrders});
        // })
        // .catch(err =>{
        //     this.setState({loading: false});
        // });
    }

    render(){
        let orders = <Spinner />

        if(!this.props.loading){
            this.props.orders.map(order =>(
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
            ) ) 
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders:state.order.orders,
        loading:state.order.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: dispatch(actions.fetchOrders),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorhandler(Orders, axios));