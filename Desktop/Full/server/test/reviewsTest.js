const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Tests Api's for reviews endpoint",()=>{

    //Test Get
    describe("GET ALL REVIEWS",()=>{
        it("It should return all list of reviews",(done)=>{
            chai.request(server)
            .get("/reviews")
            .end((err,response)=>{
                //console.log(response.body[0])
                review = response.body[0]
                review.should.be.a('object');
                review.should.have.property('_id');
                review.should.have.property('itemId');
                review.should.have.property('rating');
                review.should.have.property('author');
                review.should.have.property('review');
            })
            done();
            
        })
    })
    //Test post
    describe("POSTS A REVIEW", ()=>{
        it('It should POST a review', (done) => {
            let review = {
                itemId: "62406b464a0e012018088a2a",           
                rating : 4,
                author : "Bhagyasree",
                review : "Best newspaper. Subscribe immediately!!"
            }
              chai.request(server)
              .post('/reviews')
              .send(review)
              .end((err, res) => {
                  //console.log(res.body)
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('itemId');
                    res.body.should.have.property('rating');
                    res.body.should.have.property('author');
                    res.body.should.have.property('review');
                done();
              });
        });
    
    })
})