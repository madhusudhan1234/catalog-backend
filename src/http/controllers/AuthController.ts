import { compare } from "bcryptjs";
import { validateOrReject } from "class-validator";
import { NextFunction, Request, Response } from "express";
import jwt, { sign } from "jsonwebtoken";
import { ResponseUtil } from "../../../utils/Response";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entities/User";
import { LoginDTO, RegisterDTO } from "../../http/dtos/AuthDTO";

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const registerData = req.body;

    const dto = new RegisterDTO();
    dto.email = registerData.email;
    dto.name = registerData.name;
    dto.password = registerData.password;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(User);
    const user = repo.create(registerData);
    await repo.save(user);

    return ResponseUtil.sendResponse(
      res,
      "Successfully created new user",
      user,
      null
    );
  }

  async me(req: Request, res: Response, next: NextFunction) {
    const { authorization: tokenHeader } = req.headers;
    if (!tokenHeader) {
      return ResponseUtil.sendError(res, "Token Not Provided", 401, null);
    }

    const token = tokenHeader.split(" ")[1];

    try {
      const decoded = await jwt.verify(
        token,
        process.env.ACCESS_KEY_SECRET || "secret123"
      );
      // @ts-ignore
      const { userId: id } = decoded;
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOneByOrFail({ id });

      // @ts-ignore
      req.user = user;
      return ResponseUtil.sendResponse(
        res,
        "Got the current user.",
        user.toResponse()
      );
    } catch (error) {
      console.error(error);
      return ResponseUtil.sendError(res, "Token Not Provided", 401, null);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const dto = new LoginDTO();
    dto.email = email;
    dto.password = password;

    await validateOrReject(dto);

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOneBy({ email });
    if (!user) {
      return ResponseUtil.sendError(res, "Invalid credentials.", 401, null);
    }

    let passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      return ResponseUtil.sendError(res, "Invalid credentials.", 401, null);
    }

    let accessToken = sign(
      { userId: user.id },
      process.env.ACCESS_KEY_SECRET || "secret123",
      {
        expiresIn: "30m",
      }
    );

    const returnUser = user.toResponse();

    return ResponseUtil.sendResponse(res, "User login success.", {
      user: returnUser,
      accessToken,
    });
  }
}
