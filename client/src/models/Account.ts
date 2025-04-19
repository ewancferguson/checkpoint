export class Account {
  id: string
  email: string
  name: string
  picture: string
  createdAt: Date

  constructor(data: Account) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.createdAt = new Date(data.createdAt)
    // TODO add additional properties if needed
  }
}

export class Profile {
  id:string
  name: string
  picture: string
  constructor(data: Profile)
  {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
  }
}