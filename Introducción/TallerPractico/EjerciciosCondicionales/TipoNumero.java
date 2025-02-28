// Sistema que detecta si un número es positivo, negativo o igual a 0
package Introducción.TallerPractico.EjerciciosCondicionales;

import java.util.Scanner;

public class TipoNumero {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese un número ->");
        int numero = scanner.nextInt();

        if (numero > 0) {
            System.out.println("El numero ingresado en positivo :)");
        } else if (numero == 0) {
            System.out.println("El numero es igual a cero :/");
        } else{
            System.out.println("El número es negativo :(");
        }

        scanner.close();
    }
}
