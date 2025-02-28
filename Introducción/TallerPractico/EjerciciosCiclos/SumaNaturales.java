// Ciclo for para sumar todos los anteriores números de uno recibido.
package Introducción.TallerPractico.EjerciciosCiclos;

import java.util.Scanner;

public class SumaNaturales {
    public static void main(String[] args) {
        Scanner scanner =  new Scanner(System.in);

        System.out.println("Ingrese un número para sumar los primeros naturales----->");
        int num = scanner.nextInt();
        int suma = 0;

        for (int i = 1; i <= num; i++) {
            suma += i;
        }

        System.out.println("La suma de todos los anteriores números naturales al "+num +" es "+suma);

        scanner.close();
    }
}
