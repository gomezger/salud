export class Usuario {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        public email_verified_at: Date,
        public password: string,
        public  remenber_token: string,
        public created_at: Date,
        public updated_at: Date
    ){ }
}
