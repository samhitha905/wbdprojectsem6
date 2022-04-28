const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");
const Order = require("../models/orders");
chai.should();
chai.use(chaiHttp);

describe("Tests Api's for orders endpoint",()=>{

    //Test Get/:id
    describe("GET A PARTICULAR ORDER BY ID",()=>{
        it('It should GET a order by the given id', (done) => {
            let order = new Order({
                items : 1,
                fullName : "R.BhagyaSree",
                address : "Jaya Nagar Colony",
                city : "Tadipatri", 
                postalCode : 515411,
                country : "India",
                NameOnCard : "R.Bhagya Sree",
                CreditCardNum : "1234123456785678",
                ExpMon : 9,
                ExpYear : 2023,
                Cvv : 100,
                cart:{
                    name:"Andhra Bhoomi",
                    image:"assets/images/andhra_bhoomi.jpg",
                    language:"Telugu",
                    price:185,
                    description: "Andhra Bhoomi is a Telugu-language daily newspaper.",
                    qty:1
                } ,
                user:"Bhagyasree",
                price: 370                  
          })
          order.save((err, order) => {
              chai.request(server)
          .get('/orders/' + order.id)
              .send(order)
              .end((err, res) => {
                res.body.should.have.property('_id').eql(order.id);
                done();
              });
            });
        })
    })

    //Test post
    describe("POSTS A ORDER", ()=>{
        it('It should POST a order', (done) => {
            let order = {
                    items : 1,
                    fullName : "Rachamalla Bhagya Sree",
                    address : "Jaya Nagar Colony",
                    city : "Tadipatri", 
                    postalCode : 515411,
                    country : "India",
                    NameOnCard : "R.Bhagya Sree",
                    CreditCardNum : "1234123456785678",
                    ExpMon : 9,
                    ExpYear : 2023,
                    Cvv : 100,
                    cart:{
                        name:"Andhra Bhoomi",
                        image:"assets/images/andhra_bhoomi.jpg",
                        language:"Telugu",
                        price:185,
                        description: "Andhra Bhoomi is a Telugu-language daily newspaper.",
                        qty:1
                    } ,
                    user:"Bhagyasree",
                    price: 370                  
              }
              chai.request(server)
              .post('/orders')
              .send(order)
              .end((err, res) => {
                  //console.log(res.body)
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('user');
                    res.body.should.have.property('cart');
                    res.body.should.have.property('fullName');
                    res.body.should.have.property('address');
                    res.body.should.have.property('city');
                    res.body.should.have.property('country');
                    res.body.should.have.property('postalCode');
                    res.body.should.have.property('NameOnCard');
                    res.body.should.have.property('CreditCardNum');
                    res.body.should.have.property('ExpMon');
                    res.body.should.have.property('ExpYear');                
                    res.body.should.have.property('Cvv');                
                done();
              });
        });
    
    })
})