//1. Sistema de Conversión de grados
package Introducción.TallerPractico.EjerciciosSecuenciales;

import java.util.Scanner;

public class grados {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese la temperatura en grados Celsius ->");
        float celsius = scanner.nextFloat();

        float kelvin = celsius + 273.15f;
        float fahrenheit = ((celsius *9)/5)+32;
    

        System.out.println("Los grados "+celsius+" celsus en fahrenheit son "+fahrenheit+" grandos");
        System.out.println("Los grados "+celsius+" celsus en kelvil son "+kelvin+" grandos");

        scanner.close();
    }
}