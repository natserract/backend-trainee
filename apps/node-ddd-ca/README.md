# What's insides?

## Domain Driven Design (DDD)

Domain-Driven Design (DDD) is the approach to software development which enables us to translate complex problem domains into rich, expressive and evolving software. It's the way we design applications when the needs of our users are complex.

> If we're building an app that helps recruiters hire talent, we need to spend some time understanding the domain language and processes that exist from the recruiters' perspective.

1. Domain: The domain represents the problem space and the core of the application. It includes the entities, value objects, and business rules that define the behavior and constraints of the application.

2. Business Rules: Business rules encapsulate the specific behavior and constraints of the domain. These rules are often complex and subject to change. By separating business rules from other concerns, such as application logic or infrastructure details, we can achieve a more flexible and maintainable codebase.

3. Application Rules: Application rules define the behavior and workflow of the application. They serve as a bridge between the domain and the infrastructure, orchestrating the interactions between different domain objects and handling application-specific concerns.

4. Infrastructure: Infrastructure refers to the technical components that support the application, such as databases, external services, frameworks, and libraries. Separating the infrastructure from the core domain and application logic allows for easier maintenance and testing.

### Requirements

- Object-Oriented Programming Basics
- Object-Oriented Programming Design Principles (composition > inheritance, referring to abstractions, SOLID Principles)
- General Design Principles (YAGNI, KISS, DRY)

## Domain-Driven Design Concepts:

Aggregates: An aggregate represents a cluster of related objects treated as a single unit. In this use case, the "Product" entity can be considered an aggregate root, encapsulating the product details and maintaining consistency within its boundaries.

Value Objects: The product details such as title, description, price, and quantity can be modeled as value objects. They are immutable and provide behavior and validation rules specific to their attributes.

Domain Services: The validation and indexing processes can be implemented as domain services. They encapsulate the business logic that operates on multiple entities or value objects.

Repositories: The inventory can be managed through a repository interface that abstracts the data access layer. The repository is responsible for storing and retrieving product entities.

## SOLID principles

- Dependency Inversion Principle:
  High-level modules should not depend on low-level modules. Both should depend on abstractions (an example of an abstraction can be an interface).

Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.

## Dependency injection

Dependency injection (DI abbreviated) is a technique that removes internal dependencies from the implementation by enabling these dependencies to be injected externally.

The @injectable is a decorator available in the Inversify library, it allows you to indicate the current class can be "injected" using the container.

Three Types of Dependency Injection:

1. Constructor Injection
2. Setter Injection
3. Interface Injection

## Dependency Injection Library

### InversifyJS

- `@injectable()`: The @injectable is a decorator available in the Inversify library, it allows you to indicate the current class can be "injected" using the container.

- `@unmanaged()`: The `@unmanaged()` decorator allow users to flag that an argument will be manually injected into a base class. We use the word "unmanaged" because InversifyJS does not have control under user provided values and it doesn't manage their injection.

- `Container`: Entry point, Container modules can help you to manage the complexity of your bindings in very large applications. Example:

```ts
const userController = new UserController(
  new UserGetAllUseCase(new UserReadRepository(User, [])),
  new UserGetUseCase(new UserReadRepository(User, [])),
);
```

**Solution**:

```ts
// Entry point for Controller
const container = new Container();

// Use cases
container.bind<UserGetAllUseCase>(UserGetAllUseCase).toSelf();
container.bind<UserGetUseCase>(UserGetUseCase).toSelf();

// Controller
container.bind<UserController>(UserController).toSelf();

// Resolve
container.get<UserController>(UserController);
```
