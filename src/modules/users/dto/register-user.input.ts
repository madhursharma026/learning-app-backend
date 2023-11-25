import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString, IsNumber, IsDefined, IsNotEmpty, IsPositive,} from 'class-validator';

@InputType({ description: 'Create User inputs' })
export class RegisterUserInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  firstName: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  lastName: string;

  @Field(() => Int, { nullable: false })
  @IsNumber()
  @IsPositive()
  @IsDefined()
  age: number;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  profileImage: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  mobileNumber: string;
}


