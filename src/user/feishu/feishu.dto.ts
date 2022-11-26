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
