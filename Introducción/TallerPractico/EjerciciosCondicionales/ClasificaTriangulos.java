// Sistema que informa que tipo de trinagulo es según las medidas ingresadas
package Introducción.TallerPractico.EjerciciosCondicionales;

import java.util.Scanner;

public class ClasificaTriangulos {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Ingrese el primer lado del triangulo ->");
        float lado1 = scanner.nextFloat();

        System.out.println("Ingrese el segundo lado del triangulo ->");
        Float lado2 = scanner.nextFloat();

        System.out.println("Ingrese el tercer lado del triangulo ->");
        float lado3 = scanner.nextFloat();

        String tipo = "";

        if (lado1 == lado2 & lado2 == lado3) {
            tipo = "Equilátero";
        }else if (lado1 != lado2 & lado2 != lado3) {
            tipo = "Escaleno";
        }else{
            tipo = "Isósceles";
        }

        System.out.print("El tipo de tringulo según los lados ingresados es un "+tipo);

        scanner.close();
    }
}
