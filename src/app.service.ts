import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      app: 'Use a rota http://localhost:3000/tasks/<Nome do Município>',
      database:
        'npm run start:backend para simular no arquivo json com dados do IBGE',
      desenvolvedor: 'Lucas Sousa Almeida',
    };
  }
}
