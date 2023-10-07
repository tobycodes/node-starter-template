import { getDataSource } from "@components/db/data-source";
import { LocationService } from "@components/location";
import { logger } from "@lib/log-manager";
import { errorFactory } from "@lib/error-manager";
import { getEntityColumns } from "@lib/utils/db-utils";
import { transformErrors } from "@lib/validator";

import { User } from "./user.model";
import { UserDto } from "./user.dto";
import { validateUser } from "./user.validators";

const UserRepo = getDataSource().getRepository(User);

const defaultColumns: (keyof User)[] = [
  "id",
  "email",
  "firstName",
  "lastName",
  "color",
  "phone",
  "avatar",
  "createdAt",
  "updatedAt",
  "location",
];

interface FindOpts {
  include?: (keyof User)[];
}

class UserService {
  public async createUser(dto: UserDto) {
    const { isValid, errors } = validateUser(dto);

    if (!isValid) {
      throw errorFactory.createValidationError("Invalid user data", errors ? transformErrors(errors) : null);
    }

    if (await this.exists(dto.email)) {
      throw errorFactory.createConflictError("Invalid user data", [
        { field: "email", message: "Email already exists" },
      ]);
    }

    if (dto.location) {
      const location = await LocationService.createLocation(dto.location);
      dto.location = location;
    }

    const user = new User();
    Object.assign(user, dto);

    user.color = COLORS[Math.floor(Math.random() * COLORS.length)];

    logger.info(user, "Creating new user");
    await UserRepo.save(user);
    logger.info(user, "User created");

    const newUser = await this.getUserById(user.id);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return newUser!;
  }

  public async getUserById(id: number, opts?: FindOpts) {
    const options = this.buildOpts(opts);

    return await UserRepo.findOne({ where: { id }, select: options.fields });
  }

  public async getUserByEmail(email: string, opts?: FindOpts) {
    const options = this.buildOpts(opts);

    return await UserRepo.findOne({ where: { email }, select: options.fields });
  }

  public async exists(idOrEmail: number | string) {
    if (!isNaN(+idOrEmail)) {
      const user = await this.getUserById(Number(idOrEmail));
      return !!user;
    }

    const user = await this.getUserByEmail(String(idOrEmail));

    return !!user;
  }

  public async updateUser(id: number, dto: UserDto) {
    const { isValid, errors } = validateUser(dto);

    if (!isValid) {
      throw errorFactory.createValidationError("Invalid user data", errors ? transformErrors(errors) : null);
    }

    const user = await this.getUserById(id);

    if (!user) {
      throw errorFactory.createNotFoundError("User not found");
    }

    Object.assign(user, dto);

    logger.info(user, "Updating user");
    await UserRepo.save(user);
    logger.info(user, "User updated");

    const updatedUser = await this.getUserById(user.id);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return updatedUser!;
  }

  private buildOpts(opts: FindOpts = {}) {
    const columns = getEntityColumns(UserRepo);
    let fields = defaultColumns;

    const { include = [] } = opts;

    if (!include.every((i) => columns.includes(i))) {
      throw errorFactory.createBadRequestError("Invalid fields requested");
    }

    fields = Array.from(new Set([...defaultColumns, ...include]));

    return { fields };
  }
}

const userService = new UserService();

export { userService };

const COLORS = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];
