import React, {Component} from 'react';
import 'url-search-params-polyfill';

import CheckoutSummary from '../../components/Order/Checkout/CheckoutSummary';
import { URLSearchParams } from 'url';

class Checkout extends Component {
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1,
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        console.log('query ='+ query)
        const ingredients = {};

        for (let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }

        this.setState({ingredients: ingredients});
    }

    checkoutCancelled = ()=>{
        this.props.history.goBack();
    }

    checkoutContinued = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render (){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled = {this.checkoutCancelled}
                    checkoutContinued = {this.checkoutContinued} />
            </div>
        )
    }
}

export default Checkout;