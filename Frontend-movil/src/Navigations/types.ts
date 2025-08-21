// src/navigation/types.ts

// Stack de clientes
export type ClientStackParamList = {
    ClientList: undefined;
    ClientRegister: undefined;
    ClientUpdate: { id: number };
};

// Stack de clases
export type ClassStackParamList = {
    ClassList: undefined;
    ClassDetail: { id: number };
    ClassForm: { mode: "create" | "edit"; id?: number };
};

// Tabs raíz
export type RootTabParamList = {
    Clientes: undefined;
    Clases: undefined;
    Instructores: undefined;
    // Agrega más módulos aquí (e.g., Instructores, Pagos, etc.)
};
// Stack de instructores
export type InstructorStackParamList = {
    InstructorList: undefined;
    InstructorRegister: { mode: "create" | "edit"; id?: number };
    InstructorUpdate: { id: number };
};