import {Client, expect} from '@loopback/testlab';
import {ServiceBankApplication} from '../..';
import {setupApplication} from './test-helper';

describe('AccountController', () => {
  let app: ServiceBankApplication;
  let client: Client;
  let id: number;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /accounts', async () => {
    const account = {
      referenceUser: '123456789',
      password: 'som2!@$#',
      userName: 'TEST',
      userAgent: '00001',
      operatingSystem: 'Android',
      userIP: '0.0.0.0'
    };
    const { body, status } = await client.post('/accounts').send(account).expect(200);
    id = body.id;

    expect(status).to.eql(200);
  });

  it('invokes GET /accounts/count', async () => {
    const { body : { count } } = await client.get('/accounts/count').expect(200);
    expect(count).to.greaterThanOrEqual(1);
  });

  it('invokes PUT /accounts/{id}', async () => {
    const account = {
      referenceUser: 'CHANGE',
      password: 'som2!@$#2',
      userName: 'TEST UPDATED',
      userAgent: '00002',
      operatingSystem: 'LINUX 2',
      userIP: '21.10.20.1'
    };

    await client.put(`/accounts/${id}`).send(account).expect(204);
  });

  it('invokes PATCH /accounts/{id}', async () => {
    const account = {
      userName: 'NEW TEST UPDATED'
    };

    await client.patch(`/accounts/${id}`).send(account).expect(204);
  });

  it('invokes GET /accounts', async () => {
    const { body : { count } } = await client.get('/accounts/count').expect(200);
    const { body } = await client.get('/accounts').expect(200);
    expect(body.length).to.greaterThanOrEqual(count);
  });

  it('invokes GET /accounts/{id}', async () => {
    const res = await client.get(`/accounts/${id}`).expect(200);
    expect(res.body).to.containEql({ id });
  });

  it('invokes DELETE /accounts', async () => {
    await client.delete(`/accounts/${id}`).expect(204);
  });
});
