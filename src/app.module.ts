import { CacheModule, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { getConfig } from "./utils";
import { FeishuService } from "@/user/feishu/feishu.service";
import { FeishuController } from "@/user/feishu/feishu.controller";

//应用程序的根模块（root module）
@Module({
	imports: [
		CacheModule.register({
			isGlobal: true
		}),
		ConfigModule.forRoot({
			ignoreEnvFile: true,
			isGlobal: true,
			load: [getConfig]
		}),
		UserModule
	],
	controllers: [AppController, FeishuController],
	//定义providor，服务提供者。nest中有三种providor：class、value、factory。
	// class providor就是普通的class，会被实例化后注入给依赖方
	// value providor可以是任意类型的值，直接注入给依赖方
	// factory providor是一个工厂方法，容器将先执行该方法，然后将返回值注入给依赖方，factory支持支持异步方法。
	providers: [AppService, FeishuService]
})
export class AppModule {
}
