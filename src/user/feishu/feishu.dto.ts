import { RECEIVE_TYPE, MSG_TYPE } from '@/helper/feishu/message';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from "class-validator";

export class FeishuMessageDto {
	@IsNotEmpty()
	@IsEnum(RECEIVE_TYPE)
	@ApiProperty({ example: 'open_id', enum: RECEIVE_TYPE})
	receive_id_type: RECEIVE_TYPE

	@IsNotEmpty()
	@ApiProperty({ example: 'ou_63bdddabd8ad1e3ccd22483440447fd9' })
	receive_id?: string

	@IsNotEmpty()
	@ApiProperty({ example: '{\"text\":\" test content\"}' })
	content?: string

	@IsNotEmpty()
	@IsEnum(MSG_TYPE)
	@ApiProperty({ example: 'text', enum: MSG_TYPE })
	msg_type?: keyof MSG_TYPE
}

export class GetUserTokenDto {
	@IsNotEmpty()
	@ApiProperty({ example: '341i5bcb11fb4953a3f2c0958b3a4c89', description: '飞书临时登录凭证' })
	code: string;
	app_token: string;
}


export class FeishuUserInfo {
	accessToken?: string;
	email: string;
	avatarUrl: string;
	avatarThumb: string;
	avatarBig: string;
	avatarMiddle: string;
	mobile: string;
	enName: string;
	name: string;
	feishuUserId: string;
	feishuUnionId: string;
}
