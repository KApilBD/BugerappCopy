import React,{Component, Fragment} from 'react';
import { connect } from 'react-redux';
// import { connect } from 'redux';

//import Auxx from '../../hoc/Auxx'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/action';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon:0.7,
// };

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={}
    // }

    state = {
        // ingredients: null,
        totalPrice:4,
        // purchasable:false,
        purchasing: false,
        loading:false,
        error:null,
    }

    componentDidMount (){
        // axios.get('https://burgerpro-ff79f.firebaseio.com/ingredients.json')
        // .then((res)=>{
        //     // console.log(res.data);
        //     this.setState({ingredients: res.data});
        // })
        // .catch(error => {
        //     this.setState({error: true})
        // })
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
            .map((igKey)=>{
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum+el;
            },0);
        return sum>0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount =  this.state.ingredients[type];
    //     const updatedCount =   oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition= INGREDIENT_PRICES[type];
    //     const oldPrice= this.state.totalPrice;
    //     const newPrice=oldPrice+priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount =  this.state.ingredients[type];
    //     const updatedCount =   oldCount - 1;        
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction= INGREDIENT_PRICES[type];
    //     const oldPrice= this.state.totalPrice;
    //     const newPrice=oldPrice-priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false})
    }
    
    purchaseContinueHandler = ()=>{

            this.props.history.push('/checkout');

        // alert("You Continue!!!")
        // this.setState({loading: true})
        // const order ={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'Kapil Baraskar',
        //         adress:{
        //             city: 'Banglore',
        //             zipCode: '560066',
        //             country: 'India',                
        //         },
        //     email: 'Kapil@burgerapp.com'
        //     },
        //     deliveryMethod: 'fastest',
        // }
        // axios.post('/orders.json', order)
        // .then((res)=>{
        //     this.setState({loading:false, purchasing: false})
        // })
        // .catch((err)=>{
        //     this.setState({loading:false, purchasing: false})
        // });
    
        // const queryParam = [];
        // for (let i in this.state.ingredients){
        //     queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));  
        // }
        
        // queryParam.push('price=' + this.state.totalPrice)

        // const queryString = queryParam.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' +queryString});
    }

    render(){
        const disabledInfo ={
            ...this.props.ings
        };
        // console.log(this.props.onIngredientAdded)
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <= 0;
           // console.log(disabledInfo[key])
        }

        let orderSummary = null;

        let burger =this.state.error ? <h3 style={{textAlign: "center", marginTop:"120Px"}}>Ingedients Out of Stock..!!!</h3>:<Spinner />

        if (this.props.ings){
            burger = (<Fragment>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls
                            ingredientsAdded={this.props.onIngredientAdded}
                            ingredientsRemoved={this.props.onIngredientRemove}
                            disabled = {disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            price = {this.props.totPrice}/>
                    </Fragment>);
            orderSummary =<OrderSummary 
                    ingredients={this.props.ings }
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price = {this.props.totPrice}/>;
        }

        if (this.state.loading){
            orderSummary = <Spinner />;
        }


        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );

    }
}


const mapStateToProps = state => {
    // console.log(state)
    return {
        ings: state.ingredients,
        totPrice: state.totalPrice,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) =>dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));