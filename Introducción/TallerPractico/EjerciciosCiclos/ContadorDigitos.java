// Sistema para contar cuantos dígitos tiene un número.
package Introducción.TallerPractico.EjerciciosCiclos;

import java.util.Scanner;

public class ContadorDigitos {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Ingresa un número para saber cuandos dígitos tiene ->->->");
        int numero = scanner.nextInt();
        int num = Math.abs(numero); //Convertimos los numero negativos para poder contarlos correctamente
        int cantidad = 0;

        if (num == 0) {
            cantidad = 1;
        }else{
            while (num > 0) {
                num /=10;
                cantidad++;
            }
        }

        System.out.println("El número tiene "+cantidad+" de dígitos");

        scanner.close();
    }
}
