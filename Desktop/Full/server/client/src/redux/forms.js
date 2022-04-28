//Defining the initial values or default values for the fields present in the feedback form 
export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};

//Defining the initial values or default values for the fields present in the checkout form 
export const InitialOrder={
    fullName:'',
    address:'',
    city:'',
    postalCode:'', 
    country:'',
    NameOnCard:'',
    CreditCardNum:'',
    ExpMon:'',
    ExpYear:'',
    Cvv:'',
    cart:[],
    user:'',
    price:'',
    items:''
}