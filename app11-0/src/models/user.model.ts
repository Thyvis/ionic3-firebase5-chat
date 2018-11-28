export class User {

  public key: string

  constructor(
    public name: string,
    public username: string,
    public email: string,
    public photo: string
    //Não será mais usado
    //public uid: string
  ) {}
}
