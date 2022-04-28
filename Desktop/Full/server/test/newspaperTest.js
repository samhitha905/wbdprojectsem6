const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Tests Api's for newspapers endpoint",()=>{

    //Test Get
    describe("GET ALL NEWSPAPERS",()=>{
        it("It should return all list of newspapers",(done)=>{
            chai.request(server)
            .get("/newspapers")
            .end((err,response)=>{
                //console.log(response.body[0])
                newspaper = response.body[0]
                newspaper.should.be.a('object');
                newspaper.should.have.property('_id');
                newspaper.should.have.property('name');
                newspaper.should.have.property('description');
                newspaper.should.have.property('image');
                newspaper.should.have.property('language');
                newspaper.should.have.property('price');
                newspaper.should.have.property('featured');

            })
            done();
            
        })
    })

    //Test post
    describe("POSTS A NEWSPAPER", ()=>{
        it('It should POST a newspaper ', (done) => {
            let newspaper = {
                name: "Aenadu",
                description: "Widely used newspaper",
                image: '/assests/images/Eenadu.jpeg',
                language: 'Telugu',
                price: 200,
                featured: false
            }
              chai.request(server)
              .post('/newspapers')
              .send(newspaper)
              .end((err, res) => {
                  //console.log(res.body)
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('image');
                    res.body.should.have.property('language');
                    res.body.should.have.property('price');
                    res.body.should.have.property('featured');

                done();
              });
        });
    
    })
})