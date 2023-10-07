import Ajv, { JSONSchemaType, ErrorObject } from "ajv";
import addFormats from "ajv-formats";

const ajvInstance = new Ajv({ allErrors: true, $data: true });

const initializeAjv = () => {
  addFormats(ajvInstance);

  // ajvInstance.addFormat("password", {
  //   type: "string",
  //   validate: (password: string) => {
  //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  //     return passwordRegex.test(password);
  //   },
  // });
};

initializeAjv();

const createValidator = <T>(schema: JSONSchemaType<T>) => {
  const validate = ajvInstance.compile(schema);

  return function validator(dto: T) {
    const isValid = validate(dto);

    return { isValid, errors: validate.errors };
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformErrors = (errors: ErrorObject<string, Record<string, any>, unknown>[]) => {
  return errors.map((error) => {
    let message: string;

    switch (error.keyword) {
      case "additionalProperties":
        message = `${error.instancePath.slice(1)} has invalid property ${error.params.additionalProperty}`;
        break;
      case "required":
        message = `${error.params.missingProperty} is required`;
        break;
      case "minLength":
        message = `${error.instancePath.slice(1)} must be at least ${error.params.limit} characters`;
        break;
      case "maxLength":
        message = `${error.instancePath.slice(1)} must be at most ${error.params.limit} characters`;
        break;
      case "format":
        message = `${error.instancePath.slice(1)} must be a valid ${error.params.format}`;
        break;
      case "pattern":
        message = `${error.instancePath.slice(1)} is not a valid format`;
        break;
      case "const":
        message = `${error.instancePath.slice(1)} must be ${error.params.allowedValue}`;
        break;
      case "type":
        message = `${error.instancePath.slice(1)} must be ${error.params.type}`;
        break;
      default:
        message = error.message ?? "Invalid data";
    }

    return { message, field: error.instancePath.slice(1) };
  });
};

export { ajvInstance, createValidator, transformErrors };
