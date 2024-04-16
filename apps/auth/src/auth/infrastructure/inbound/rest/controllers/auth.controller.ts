import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignUpDto, SignUpResponseDto } from '../dtos/sign-up.dto';
import CreateUserUseCase from 'src/auth/application/usecases/create-user.usecase';
import { signUpMapper, signUpResponseMapper } from '../mappers/sign-up.mapper';
import { Request } from 'express';
import { LoginDto, LoginResponseDto } from '../dtos/login.dto';
import { loginMapper, loginResponseMapper } from '../mappers/login.mapper';
import LoginUseCase from 'src/auth/application/usecases/login.usecase';
import { JwtAuthGuard } from 'src/common/jwt/jwt.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUseCase,
  ) {}

  @Post('sign-up')
  async signUp(
    @Body() body: SignUpDto,
    @Req() request: Request,
  ): Promise<SignUpResponseDto> {
    const signUpCommand = signUpMapper(body, request.ip);
    const response = await this.createUserUseCase.execute(signUpCommand);
    return signUpResponseMapper(response);
  }

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Req() request: Request,
  ): Promise<LoginResponseDto> {
    const loginCommand = loginMapper(body, request.ip);
    const response = await this.loginUserUseCase.execute(loginCommand);
    return loginResponseMapper(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
