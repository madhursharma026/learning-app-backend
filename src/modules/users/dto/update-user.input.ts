import { IsDefined, IsString } from 'class-validator';
import { RegisterUserInput } from './register-user.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(RegisterUserInput) {}
