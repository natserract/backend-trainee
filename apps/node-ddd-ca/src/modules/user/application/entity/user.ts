export class UserEntity {
  constructor(
    public readonly id: number,
    public credentialUuid: string,
    public email: string,
    public phone: string | null | undefined,
  ) {}

  getEmail() {
    return this.email;
  }
}
