import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import 'url-search-params-polyfill';

import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import { URLSearchParams } from 'url';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {
    // state={
    //     ingredients:null,
    //     totalPrice: 0,
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     console.log('query ='+ query)
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()){

    //         if (param[0] === 'price'){
    //             price = param[1];
    //         }else{
    //         ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to='/' />
        // console.log(summary);

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to = '/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />

                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );

            console.log(summary);
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

// const mapDispatchToProps = (dispatch) =>{
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//     }
// } 

export default connect(mapStateToProps)(Checkout);