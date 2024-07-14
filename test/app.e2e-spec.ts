import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should say hello', async () => {
    const result = await request(app.getHttpServer())
      .get('/v1/hello')
      .query({ firstName: 'Iqbal', lastName: 'Pamula' });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('Hello Iqbal Pamula');
  });
});
