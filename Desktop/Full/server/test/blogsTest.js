const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("Tests Api's for blogs endpoint",()=>{

    //Test Get
    describe("GET ALL BLOGS",()=>{
        it("It should return all list of blogs",(done)=>{
            chai.request(server)
            .get("/blogs")
            .end((err,response)=>{
                //console.log(response.body[0])
                blog = response.body[0]
                blog.should.be.a('object');
                blog.should.have.property('_id');
                blog.should.have.property('user');
                blog.should.have.property('title');
                blog.should.have.property('message');
            })
            done();
            
        })
    })
    
    //Test post
    describe("POSTS A BLOG", ()=>{
        it('It should POST a blog', (done) => {
            let blog = {
                user: "Bhagya",
                title: "Andhra Jyothi",
                message: "Andhra Jyothi is published from 21 centers across the states of Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu. Vemuri Radhakrishna, a senior journalist turned entrepreneur is its Managing Director and noted litterateur K. Srinivas is its Editor. It is the third-largest circulated Telugu daily, according to the Audit Bureau of Circulation (ABC) and is known for its dynamic political reporting. "
            }
              chai.request(server)
              .post('/blogs')
              .send(blog)
              .end((err, res) => {
                  //console.log(res.body)
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('user');
                    res.body.should.have.property('title');
                    res.body.should.have.property('message');
                done();
              });
        });
    
    })
})