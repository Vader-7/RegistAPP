export interface RegistroAsist {
    nombreCurso: string;
    fecha: Date[];
    asistencia: number;
    seccion: string;
}
export interface Cursos {
    cursos: RegistroAsist[];
}
export interface RegistrosFec {
    nombreCurso: string;
    fecha: Date[];
}