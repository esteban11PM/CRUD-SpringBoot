// 5. Intercanvio de valores de variables sin una variable auxiliar.
package Introducción.TallerPractico.EjerciciosSecuenciales;

import java.util.Scanner;

public class intercambio {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese el valor para la primera variable ->");
        int valor1 = scanner.nextInt();
        System.out.println("Ingrese el valor para la segunda variable ->");
        int valor2 = scanner.nextInt();

        valor1 = valor1 + valor2;
        valor2 = valor1 - valor2;
        valor1 = valor1 - valor2;

        System.out.println("el valor del la primera variable ahora es el de la segunda: "+valor1);
        System.out.println("Y el valor de la segunda variable ahora es el de la primera: "+valor2);

        scanner.close();
    }
}
