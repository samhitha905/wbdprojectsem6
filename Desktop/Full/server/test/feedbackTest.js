const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Tests Api's for feedbacks endpoint",()=>{

    //Test post
    describe("POSTS A FEEDBACK", ()=>{
        it('It should POST a feedback', (done) => {
            let feedback = {
                firstname:"Bhagya",
                lastname:"Sree",
                telnum:"2222521252",
                email:"bs@gmail.com",
                contactType:"Email",
                message:"Very helpful website to buy subscriptions for magazines especially."
              }
              chai.request(server)
              .post('/feedbacks')
              .send(feedback)
              .end((err, res) => {
                  //console.log(res.body)
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('firstname');
                    res.body.should.have.property('lastname');
                    res.body.should.have.property('telnum');
                    res.body.should.have.property('email');
                    res.body.should.have.property('contactType');
                    res.body.should.have.property('message');
                    
                done();
              });
        });
    
    })
})