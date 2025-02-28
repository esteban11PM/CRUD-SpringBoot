// Sistema de una calculadora pequeña
package Introducción.TallerPractico.EjerciciosCondicionales;

import java.util.Scanner;

public class Calculadora {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Ingrese un número ->");
        int num1 = scanner.nextInt();

        System.out.println("Ingrese otro un número ->");
        int num2 = scanner.nextInt();

        scanner.nextLine();

        System.out.println("Ingrese la operación que desea realizar (+) (-) (*) (/)");
        String operacion = scanner.nextLine();

        float resultado = 0;

        if (operacion.equals("+")) {
            resultado = num1+num2;
        }else if (operacion.equals("-")) {
            resultado = num1-num2;
        }else if (operacion.equals("*")) {
            resultado = num1*num2;
        }else if (operacion.equals("/")) {
            if (num2 != 0) {
                resultado = num1/num2;
            }else{
                System.out.println("No se puede dividir entre O invesil");
                scanner.close();
                return;
            }
        }else{
            System.out.println("operación no valida. Intente de nuevo...");
            scanner.close();
            return;
        }

        System.out.println("El resultado de la operación es: "+resultado);
        scanner.close();

    }
}
