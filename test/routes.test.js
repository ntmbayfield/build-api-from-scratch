const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('Clothing Resources', function () {
  describe('POST /', function () {
    it('should create a piece of clothing', function (done) {
      const clothing = { type: 'Dress', size: 'XXL', color: 'Red', designer: 'Calvin Klein', price: 150 }
      chai.request(app)
        .post('/clothes')
        .send(clothing)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.type).to.equal(clothing.type)
          expect(res.body.data.size).to.equal(clothing.size)
          expect(res.body.data.color).to.equal(clothing.color)
          expect(res.body.data.designer).to.equal(clothing.designer)
          expect(res.body.data.price).to.equal(clothing.price)
          done()
        })
    })

    it('should return an error if type is missing', function (done) {
      const clothing = { size: 'XXL', color: 'Red', designer: 'Calvin Klein', price: 150 }
      chai.request(app)
        .post('/clothes')
        .send(clothing)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if size is missing', function (done) {
      const clothing = { type: 'Dress', color: 'Red', designer: 'Calvin Klein', price: 150 }
      chai.request(app)
        .post('/clothes')
        .send(clothing)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if color is missing', function (done) {
      const clothing = { type: 'Dress', size: 'XXL', designer: 'Calvin Klein', price: 150 }
      chai.request(app)
        .post('/clothes')
        .send(clothing)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if designer is missing', function (done) {
      const clothing = { type: 'Dress', size: 'XXL', color: 'Red', price: 150 }
      chai.request(app)
        .post('/clothes')
        .send(clothing)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if price is missing', function (done) {
      const clothing = { type: 'Dress', size: 'XXL', color: 'Red', designer: 'Calvin Klein' }
      chai.request(app)
        .post('/clothes')
        .send(clothing)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('GET /', function () {
    it('should retrieve a list of all the clothes', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          expect(clothing).to.be.an('object')
          expect(clothing.id).to.be.ok
          done()
        })
    })
  })

  describe('GET /:id', function () {
    it('should retrieve the single piece of clothing specified', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          chai.request(app)
            .get(`/clothes/${clothing.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')

              expect(res.body.data.id).to.equal(clothing.id)
              done()
            })
        })
    })

    it('should return an error if the id does not match a piece of clothing', function (done) {
      chai.request(app)
        .get('/clothes/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('PUT /:id', function () {
    it('should update an existing piece of clothing when all information is provided', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          const newInfo = { type: 'Dress', size: 'XXL', color: 'Red', designer: 'Calvin Klein', price: 150 }
          chai.request(app)
            .put(`/clothes/${clothing.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.id).to.be.ok
              expect(res.body.data.type).to.equal(newInfo.type)
              expect(res.body.data.size).to.equal(newInfo.size)
              expect(res.body.data.color).to.equal(newInfo.color)
              expect(res.body.data.designer).to.equal(newInfo.designer)
              expect(res.body.data.price).to.equal(newInfo.price)
              done()
            })
        })

    })

    it('should return an error if type is missing', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          const newInfo = { size: 'XXL', color: 'Red', designer: 'Calvin Klein', price: 150 }
          chai.request(app)
            .put(`/clothes/${clothing.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if size is missing', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          const newInfo = { type: 'Dress', color: 'Red', designer: 'Calvin Klein', price: 150 }
          chai.request(app)
            .put(`/clothes/${clothing.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if color is missing', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          const newInfo = { type: 'Dress', size: 'XXL', designer: 'Calvin Klein', price: 150 }
          chai.request(app)
            .put(`/clothes/${clothing.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if designer is missing', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          const newInfo = { type: 'Dress', size: 'XXL', color: 'Red', price: 150 }
          chai.request(app)
            .put(`/clothes/${clothing.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if price is missing', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          const newInfo = { type: 'Dress', size: 'XXL', color: 'Red', designer: 'Calvin Klein' }
          chai.request(app)
            .put(`/clothes/${clothing.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
  })

  describe('DELETE /:id', function () {
    it('should remove the specified piece of clothing', function (done) {
      chai.request(app)
        .get('/clothes')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const clothing = res.body.data[0]
          chai.request(app)
            .delete(`/clothes/${clothing.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(204)
              chai.request(app)
                .get(`/clothes/${clothing.id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(404)
                  done()
                })
            })
        })
    })

    it('should return an error if the id is not found', function (done) {
      chai.request(app)
        .delete('/clothes/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})
