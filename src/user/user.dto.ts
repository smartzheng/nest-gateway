import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddUserDto {
	@ApiProperty({ example: 123, })
	id?: string;

	@ApiProperty({ example: 'cookie' })
	@IsNotEmpty()
	name: string;

	@ApiProperty({ example: 'smartzheng@qq.com' })
	@IsNotEmpty()
	email: string;

	@ApiProperty({ example: 'smartzheng' })
	@IsNotEmpty()
	username: string;
}
