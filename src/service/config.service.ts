import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';


export interface EnvConfig {
  [key: string]: string | undefined;
}


export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const error = dotenv.config().error;
    this.envConfig = process.env;
  }

  private validateInput(config: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      BASE_PATH: Joi.string()
        .allow('')
        .default(''),
      PORT: Joi.number().default(4000),
      SWAGGER_ENABLED: Joi.boolean().default(false),
      REDIS_HOST: Joi.string().default('localhost'),
      REDIS_PORT: Joi.number().default(6379),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      config,
      envVarsSchema,
      { allowUnknown: true },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
  get basePath(): string {
    return String(this.envConfig.BASE_PATH);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  get isSwaggerEnabled(): boolean {
    return Boolean(this.envConfig.SWAGGER_ENABLED);
  }

  get redisPort(): number {
    return Number(this.envConfig.REDIS_PORT)
  }

  get redisHost(): string {
    return String(this.envConfig.REDIS_HOST)
  }
}
