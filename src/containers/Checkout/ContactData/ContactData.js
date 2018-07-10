import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component {

    state = {
        name: '',
        email:'',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
               alert("You Continue!!!")
        this.setState({loading: true})
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Kapil Baraskar',
                adress:{
                    city: 'Banglore',
                    zipCode: '560066',
                    country: 'India',                
                },
            email: 'Kapil@burgerapp.com'
            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json', order)
        .then((res)=>{
            this.setState({loading:false})
            this.props.history.push('/');
        })
        .catch((err)=>{
            this.setState({loading:false})
        }); 
    }

    render(){

        let form = (<form>
                <input className={classes.Input} type = "text" name = "name" placeholder="Your Name" />
                <input className={classes.Input} type = "email" name = "email" placeholder="Your Mail" />
                <input className={classes.Input} type = "text" name = "street" placeholder="Street" />
                <input className={classes.Input} type = "text" name = "postal" placeholder="Postal" />
                <Button btnType="Success" 
                    clicked = {this.orderHandler}>ORDER</Button>
            </form>);
        if(this.state.loading){
            form = <Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                <h3>Enter Your contact Data.</h3>
                {form}
            </div>
        );
    }
}

export default ContactData; 