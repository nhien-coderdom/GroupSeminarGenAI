import { IsNotEmpty, IsString } from 'class-validator';

export class QuickAddDto {
  @IsString()
  @IsNotEmpty()
  text!: string; // e.g. "80k cafe", "1tr tiền nhà"
}
