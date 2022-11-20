import { Body, Controller, Delete, Get, Param, Patch, Post, Version, VERSION_NEUTRAL } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ConfigService } from "@nestjs/config";

@Controller({
	path: 'user',
	version: '1'
})
export class UserController {
	constructor(private readonly userService: UserService, private readonly configService: ConfigService) {
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Version([VERSION_NEUTRAL, '1'])
	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Version(['2'])
	@Get()
	findAllV2() {
		return this.userService.findAllV2();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}

	@Get('getTestName')
	getTestName() {
		console.log(111)
		return this.configService.get('TEST_VALUE').name;
	}

}
