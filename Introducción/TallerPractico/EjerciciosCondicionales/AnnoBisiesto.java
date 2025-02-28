// Sistema que informa si un año es bisiesto o no
package Introducción.TallerPractico.EjerciciosCondicionales;

import java.util.Scanner;

public class AnnoBisiesto {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese un año para saber si es bisiesto ->");
        int anno = scanner.nextInt();

        if (anno % 4 == 0 & anno % 100 != 0 || anno % 400 == 0 ) {
            System.out.println("El año ingresado es bisisesto!!!!!");
        }else {
            System.out.println("El año ingresado no es bisiesto!!");
        }
        scanner.close();
    }
}
