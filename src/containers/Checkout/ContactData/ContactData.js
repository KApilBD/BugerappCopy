import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pin Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
                validation:{},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        alert("You Continue!!!")
        this.setState({ loading: true })
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        }
        axios.post('/orders.json', order)
            .then((res) => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch((err) => {
                this.setState({ loading: false })
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderform = {
            ...this.state.orderForm,
        }
        const updatedFormElement = {
            ...updatedOrderform[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderform[inputIdentifier] = updatedFormElement;
        let formIsValid = true;

        for (let inputIdentifier in updatedOrderform) {
            formIsValid = updatedOrderform[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderform, formIsValid: formIsValid });

    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push(
                {
                    id: key,
                    config: this.state.orderForm[key],
                }
            )
        }


        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success"
                    disabled={!this.state.formIsValid}
                >ORDER</Button>
            </form>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h3>Enter Your contact Data.</h3>
                {form}
            </div>
        );
    }
}

export default ContactData; 