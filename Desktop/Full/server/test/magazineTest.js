const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Tests Api's of magazines endpoint",()=>{

    //Test Get
    describe("GET ALL MAGAZINES",()=>{
        it("It should return all list of magazines",(done)=>{
            chai.request(server)
            .get("/magazines")
            .end((err,response)=>{
                //console.log(response.body[0])
                magazine = response.body[0]
                magazine.should.be.a('object');
                magazine.should.have.property('_id');
                magazine.should.have.property('name');
                magazine.should.have.property('image');
                magazine.should.have.property('language');
                magazine.should.have.property('category');
                magazine.should.have.property('price');
                magazine.should.have.property('description');
                magazine.should.have.property('featured');


            })

            done();
            
        })
    })
    //Test post
    describe("POSTS A MAGAZINE", ()=>{
        it('It should POST a magazine ', (done) => {
            let magazine = {
                name: "Business World",
                image: "assets/images/im1.jpg",
                language:"English",
                price: 365,
                featured: true,
                description: "BW Businessworld is an Indian business magazine",
                category: "business" 
            }
              chai.request(server)
              .post('/magazines')
              .send(magazine)
              .end((err, res) => {
                  //console.log(res.body)
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('image');
                    res.body.should.have.property('language');
                    res.body.should.have.property('category');
                    res.body.should.have.property('price');
                    res.body.should.have.property('description');
                    res.body.should.have.property('featured');
                done();
              });
        });
    
    })
})