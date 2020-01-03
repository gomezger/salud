import { Profesional } from './profesional';

export class Opinion {
    constructor(
        public id_profesional: number,
        public profesional: Profesional,
        public id: number,
        public nombre: string,
        public email: string,
        public telefono: string,
        public descripcion: string,
        public aprobado: boolean,
        public created_at: Date,
        public updated_at: Date
    ){ }
}
