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
    ClassRegister: undefined;
};

// Tabs raíz
export type RootTabParamList = {
    Clientes: undefined;
    Clases: undefined;
    // Agrega más módulos aquí (e.g., Instructores, Pagos, etc.)
};
