import request from 'supertest';
import { app } from '@config/server';

describe('Root endpoint /api', () => {
  it('should return 404 for /api', async () => {
    await request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404);
  });
});
