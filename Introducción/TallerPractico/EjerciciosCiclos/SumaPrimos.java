// Ciclo para Imprimir todos los numeros primos en el reango recibido.
package Introducción.TallerPractico.EjerciciosCiclos;

import java.util.Scanner;

public class SumaPrimos {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese el limite para mostrar todos los números primos");
        
        int rango = scanner.nextInt();
        
        if (rango <2) {
            System.out.println("Error: ¡El rango debe ser mayor a 2!");
            scanner.close();
            return;
        }

        System.out.println("La lista de números primos que hay hasta el "+rango+" es...");
        
        for (int num = 2; num <= rango; num++) {
            if (esPrimo(num)) {
                System.out.println(num);
            }
        }
        scanner.close();
    }

    public static boolean esPrimo(int numero){

        for (int i = 2; i <= Math.sqrt(numero); i++) {
            if (numero % i == 0) {
                return false;
            }
        }
        return true;
    }
}
