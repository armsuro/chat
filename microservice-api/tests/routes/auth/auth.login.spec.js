import * as chai from 'chai';
import server from '../../utils/server.mock';
import DB from 'db';
import UserFactory from '../../factories/user.factory';

const expect = chai.expect;

const ENDPOINT = '/api/auth/login'
let defaultUserPayload = UserFactory.generate();
let savedUser;

describe(`POST ${ENDPOINT}`, () => {
    before(async() => {
        savedUser = await DB.users.Account.create(defaultUserPayload)
    });

    describe('#200', () => {
        it('return an auth token upon successful password verification', (done) => {
            server.post(ENDPOINT)
                .send({
                    username: savedUser.username,
                    password: defaultUserPayload.password
                }).end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(200);
                    expect(res.body.token).to.be.defined;
                    done();
                })

        });
    });

    describe('#401', () => {
        it('incorrect username, incorrect password', done => {
            server.post(ENDPOINT)
                .send({
                    username: 'wrong',
                    password: 'wrong'
                })
                .end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(401);
                    done();
                });
        });
    })
});