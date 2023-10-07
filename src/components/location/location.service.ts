import { getDataSource } from "@components/db/data-source";
import { errorFactory } from "@lib/error-manager";
import { logger } from "@lib/log-manager";
import { transformErrors } from "@lib/validator";

import { LocationDto } from "./location.dto";
import { Location } from "./location.model";
import { validateLocation } from "./location.validators";

const LocationRepo = getDataSource().getRepository(Location);

class LocationService {
  public async createLocation(location: LocationDto) {
    const { isValid, errors } = validateLocation(location);

    if (!isValid) {
      throw errorFactory.createValidationError("Invalid location data", errors ? transformErrors(errors) : null);
    }

    const newLocation = new Location();
    Object.assign(newLocation, location);

    logger.info(newLocation, "Creating new location");

    await LocationRepo.save(newLocation);

    logger.info(newLocation, "Location created");

    return newLocation;
  }

  public async getLocationById(id: number) {
    return await LocationRepo.findOneBy({ id });
  }
}

export const locationService = new LocationService();
