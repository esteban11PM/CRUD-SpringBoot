// Sistema que encuentra el mayor de tres números ingresados
package Introducción.TallerPractico.EjerciciosCondicionales;

import java.util.Scanner;

public class NumeroMayor {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese el primer número ->");
        int num1 = scanner.nextInt();
        System.out.println("Ingrese el segundo número ->");
        int num2 = scanner.nextInt();
        System.out.println("Ingrese el tercer número ->");
        int num3 = scanner.nextInt();

        
        if (num1 == num2 & num1 == num3 & num2 == num3) {
            System.out.println("Todos los números son iguales");
        }else if (num1 > num2 & num1 > num3) {
            System.out.println("El mayor de los tres números es -> "+num1);
        }else if (num2 > num1 & num2>num3) {
            System.out.println("El mayor de los tres números es -> "+num2);
        }else {
            System.out.println("El mayor de los tres números es -> "+num3);
        }

        scanner.close();
    }
    

}
