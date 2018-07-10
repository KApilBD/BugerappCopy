import React,{Component, Fragment} from 'react';
//import Auxx from '../../hoc/Auxx'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon:0.7,
};

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={}
    // }

    state = {
        ingredients: null,
        totalPrice:4,
        purchasable:false,
        purchasing: false,
        loading:false,
        error:null,
    }

    componentDidMount (){
        axios.get('https://burgerpro-ff79f.firebaseio.com/ingredients.json')
        .then((res)=>{
            // console.log(res.data);
            this.setState({ingredients: res.data});
        })
        .catch(error => {
            this.setState({error: true})
        })
    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
            .map((igKey)=>{
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum+el;
            },0);
        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) => {
        const oldCount =  this.state.ingredients[type];
        const updatedCount =   oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition= INGREDIENT_PRICES[type];
        const oldPrice= this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount =  this.state.ingredients[type];
        const updatedCount =   oldCount - 1;        
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction= INGREDIENT_PRICES[type];
        const oldPrice= this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false})
    }
    
    purchaseContinueHandler = ()=>{
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
    
        const queryParam = [];
        for (let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));  
        }
        
        const queryString = queryParam.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' +queryString});
    }

    render(){
        const disabledInfo ={
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <= 0;
           // console.log(disabledInfo[key])
        }

        let orderSummary = null;

        let burger =this.state.error ? <h3 style={{textAlign: "center", marginTop:"120Px"}}>Ingedients Out of Stock..!!!</h3>:<Spinner />

        if (this.state.ingredients){
            burger = (<Fragment>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls
                            ingredientsAdded={this.addIngredientHandler}
                            ingredientsRemoved={this.removeIngredientHandler}
                            disabled = {disabledInfo}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                            price = {this.state.totalPrice}/>
                    </Fragment>);
            orderSummary =<OrderSummary 
                    ingredients={this.state.ingredients }
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price = {this.state.totalPrice}/>;
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

export default withErrorHandler(BurgerBuilder, axios);