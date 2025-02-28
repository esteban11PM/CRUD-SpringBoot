// Clico while que multiplica un número hasta el 10
package Introducción.TallerPractico.EjerciciosCiclos;

import java.util.Scanner;

public class TablaNumero {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Ingrese un número para ver su tabla de multiplicar...");
        int num = scanner.nextInt();
        int i = 1;
        int product = 0;

        System.out.println("Tabla del "+num+" multipliaca hasta el 10");
        System.out.println("-------------------------------------");

        while (i <= 10) {
            product = num * i;
            System.out.println(num+" x "+i+" = "+product);
            i++;
        }

        scanner.close();
    }
}