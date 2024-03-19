import { Container } from "inversify";

import { UserGetAllUseCase } from "~/modules/user/application/usecase/get_all";
import { UserGetUseCase } from "~/modules/user/application/usecase/get";
import { UserController } from "~/modules/user/infra/http/api/controller/controller";

// Entry point for Controller
const container = new Container();

// Register use cases
container.bind<UserGetAllUseCase>(UserGetAllUseCase).toSelf();
container.bind<UserGetUseCase>(UserGetUseCase).toSelf();

// Register controllers
container.bind<UserController>(UserController).toSelf();

export default container;
