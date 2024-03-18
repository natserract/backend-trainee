class ApplicationError<
  TName extends string = "ApplicationError",
  TMessage extends string = string,
  TDetails = unknown,
> extends Error {
  name: TName;

  details: TDetails;

  message: TMessage;

  constructor(
    message = "An application error occured" as TMessage,
    details: TDetails = {} as TDetails,
  ) {
    super();
    this.name = "ApplicationError" as TName;
    this.message = message;
    this.details = details;
  }
}

class ValidationError<
  TMessage extends string = string,
  TDetails = unknown,
> extends ApplicationError<"ValidationError", TMessage, TDetails> {
  constructor(message: TMessage, details?: TDetails) {
    super(message, details);
    this.name = "ValidationError";
  }
}

class NotFoundError<
  TMessage extends string = string,
  TDetails = unknown,
> extends ApplicationError<"NotFoundError", TMessage, TDetails> {
  constructor(message = "Entity not found" as TMessage, details?: TDetails) {
    super(message, details);
    this.name = "NotFoundError";
    this.message = message;
  }
}

class ForbiddenError<
  TName extends string = "ForbiddenError",
  TMessage extends string = string,
  TDetails = unknown,
> extends ApplicationError<TName, TMessage, TDetails> {
  constructor(message = "Forbidden access" as TMessage, details?: TDetails) {
    super(message, details);
    this.name = "ForbiddenError" as TName;
    this.message = message;
  }
}

class UnauthorizedError<
  TMessage extends string = string,
  TDetails = unknown,
> extends ApplicationError<"UnauthorizedError", TMessage, TDetails> {
  constructor(message = "Unauthorized" as TMessage, details?: TDetails) {
    super(message, details);
    this.name = "UnauthorizedError";
    this.message = message;
  }
}

export {
  ApplicationError,
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
};
