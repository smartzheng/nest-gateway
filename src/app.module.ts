import { CacheModule, Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { getConfig } from "./utils";
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';
//应用程序的根模块（root module）
@Module({
	imports: [
		CacheModule.register({
			isGlobal: true,
			store: redisStore,
			host: getConfig('REDIS_CONFIG').host,
			port: getConfig('REDIS_CONFIG').port,
			auth_pass: getConfig('REDIS_CONFIG').auth,
			db: getConfig('REDIS_CONFIG').db
		}),
		ConfigModule.forRoot({
			ignoreEnvFile: true,
			isGlobal: true,
			load: [getConfig]
		}),
		UserModule,
		AuthModule
	],
	controllers: [],
	//定义providor，服务提供者。nest中有三种providor：class、value、factory。
	// class providor就是普通的class，会被实例化后注入给依赖方
	// value providor可以是任意类型的值，直接注入给依赖方
	// factory providor是一个工厂方法，容器将先执行该方法，然后将返回值注入给依赖方，factory支持支持异步方法。
	providers: [{
		provide: APP_GUARD,
		useClass: JwtAuthGuard,
	}]
})
export class AppModule {
}
