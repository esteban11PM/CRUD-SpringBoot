//2. Sistema para el calculo de masa corporal de una persona
package Introducción.TallerPractico.EjerciciosSecuenciales;

import java.util.Scanner;

public class calculoIMC {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese su peso para calcular el IMC ->");
        float peso = scanner.nextFloat();
        System.out.println("Ahora ingrese su estatura en metros ->");
        float estaura = scanner.nextFloat();

        float imc = peso/(float)Math.pow(estaura,2);

        System.out.println("El indice de masa corporal de la persona es "+imc);

        scanner.close();
    }
}
