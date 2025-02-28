package Introducción.TallerPractico.EjerciciosCiclos;

import java.util.Scanner;

public class SerieFibonacci {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingresa el numero hasta donde llegara la serie fibonacci -->");
        
        int num = scanner.nextInt();
        int acumulado = 0;
        int inicial = 0;
        int secuencia = 1;
        
        System.out.println("La serie hasta "+num+" es la siguiente:");

        for (int i = 0; i < num; i++) {
            System.out.println(inicial);

            acumulado = inicial + secuencia;
            inicial = secuencia;
            secuencia = acumulado;
        }

        scanner.close();
    }
}
