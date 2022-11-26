import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AllExceptionFilter } from './common/exceptions/base.exception.filter'
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'
import { generateDocument } from './doc'
import fastify from "fastify";
import { FastifyLogger } from './common/logger';
// import ioc from '../ioc'
declare const module: any
// import { NestExpressApplication } from '@nestjs/platform-express'

// 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			logger: FastifyLogger
		})
	)
	app.enableVersioning({
		defaultVersion: [VERSION_NEUTRAL, '1', '2'],
		type: VersioningType.URI
	})
	app.useGlobalInterceptors(new TransformInterceptor())
	app.useGlobalFilters(new AllExceptionFilter(), new HttpExceptionFilter())
	// 启动全局字段校验，保证请求接口字段校验正确。
	app.useGlobalPipes(new ValidationPipe())
	generateDocument(app)
	if (module.hot) {
		// ioc()
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
	await app.listen(3000)
}

bootstrap().then(_ => console.log)
