import { createValidator } from "@lib/validator";
import { JSONSchemaType } from "ajv";
import { LocationDto } from "./location.dto";

const locationSchema: JSONSchemaType<LocationDto> = {
  type: "object",
  properties: {
    lat: { type: "number" },
    lng: { type: "number" },
    city: { type: "string" },
    state: { type: "string" },
  },
  required: ["lat", "lng", "city", "state"],
  additionalProperties: false,
};

const validateLocation = createValidator(locationSchema);

export { validateLocation, locationSchema };
