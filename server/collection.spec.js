const expect = require('chai').expect;
const Collection = require('./collection');
const Promise = require('bluebird');

describe('Collection', () => {

  let collection;

  beforeEach(() => {
    collection = new Collection();
  });

  describe('.drop', () => {

    beforeEach(() => {
      return collection.insertOne({ email: 'test@email.com' });
    });

    it('removes all documents', () => {
      return collection.drop().then(() => {
        return collection.find().then((documents) => {
          expect(documents).to.have.length(0);
        });
      });
    });

    it('reset current id', () => {
      return collection.drop().then(() => {
        expect(collection._nextId()).to.eq(1);
        expect(collection._nextId()).to.eq(2);
        expect(collection._nextId()).to.eq(3);
      });
    });

  });

  describe('.find', () => {

    beforeEach(() => {
      return Promise.all([
        collection.insertOne({ mail: 'foo@email.com' }),
        collection.insertOne({ mail: 'bar@email.com' })
      ]);
    });

    it('returns all documents', () => {
      return collection.find().then((documents) => {
        expect(documents).to.have.length(2);
      });
    });

  });

  describe('.findOne', () => {

    const email = 'foo@bar.com';

    beforeEach(() => {
      return collection.insertOne({ email });
    });

    describe('when a document can be found', () => {

      it('resolves with the found document', () => {
        return collection.findOne({ email }).then((document) => {
          expect(document).to.not.be.undefined;
          expect(document).to.have.property('email', email)
        });
      });

    });

    describe('when a document cannot be found', () => {

      it('rejects', (done) => {
        collection.findOne({ email: 'foo@baz.com' }).catch(() => {
          done();
        });
      });

    });

  });

  describe('.insertOne', () => {

    it('inserts a document', () => {
      return collection.insertOne({ email: 'foo@email.com' }).then(() => {
        return collection.find().then((documents) => {
          expect(documents).to.have.length(1);
          expect(documents[0]).to.have.property('id');
          expect(documents[0]).to.have.property('email', 'foo@email.com');
          expect(documents[0]).to.have.property('updatedAt');
          expect(documents[0]).to.have.property('createdAt');
        });
      });
    });

  });

  describe('.updateOne', () => {

    let id;

    beforeEach(() => {
      return collection.insertOne({ firstName: 'Anakin' }).then((document) => {
        id = document.id;
      });
    });

    it('updates a document', () => {
      return collection.updateOne({ id }, { firstName: 'Luke' }).then((document) => {
        expect(document).to.have.property('id', id);
        expect(document).to.have.property('firstName', 'Luke');
        expect(document).to.have.property('updatedAt');
        expect(document).to.have.property('createdAt');
      });
    });

  });

  describe('.deleteOne', () => {

    let id;

    beforeEach(() => {
      return collection.insertOne({ firstName: 'Anakin' }).then((document) => {
        id = document.id;
      });
    });

    it('deletes a document', () => {
      return collection.deleteOne({ id }).then(() => {
        return collection.find().then((documents) => {
          expect(documents).to.have.length(0);
        });
      });
    });

  });

});
