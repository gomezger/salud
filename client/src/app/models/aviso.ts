export class Aviso {
    constructor(
        public id: number,
        public destinatario: string,
        public asunto: string,
        public emisor: string,
        public emisor_nombre: string,
        public adjunto: string,
        public enviado: boolean,
        public created_at: Date,
        public updated_at: Date
    ){
    }
}
