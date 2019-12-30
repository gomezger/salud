import { TipoProfesional } from './tipo-profesional';

export class Profesional {
    constructor(
        public id: number,
        public id_tipo: number,
        public tipo: TipoProfesional,
        public nombre: string,
        public imagen: string,
        public imagen_file: File,
        public cv: string,
        public cv_file: File,
        public email: string,
        public telefono: string,
        public created_at: Date,
        public updated_at: Date
    ){ }
}
