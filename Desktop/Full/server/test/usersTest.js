const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Tests Api's for users endpoint",()=>{

    //Test post
    describe("POSTS A USER", ()=>{
        it('It should POST a user', (done) => {
            let user = {
                username: "R Bhagya",
                password: "bhagya"
            }
              chai.request(server)
              .post('/users')
              .send(user)
              .end((err, res) => {
                  //console.log(res.body)
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('username');
                    res.body.should.have.property('password');
                done();
              });
        });
    
    })
})