//4. Sistema para Hacer operaciones matematicas con dos números ingresados
package Introducción.TallerPractico.EjerciciosSecuenciales;

import java.util.Scanner;

public class operaciones {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Ingrese un numero ->");
        int numeroUno = scanner.nextInt();
        System.out.println("Ingrese otro un numero ->");
        int numeroDos = scanner.nextInt();

        int sumar = numeroUno + numeroDos;
        int restar = numeroUno - numeroDos;
        int multiplicar = numeroUno * numeroDos;
        long dividir = numeroUno / numeroDos;

        System.out.println(sumar);
        System.out.println(restar);
        System.out.println(multiplicar);
        System.out.println(dividir);

        scanner.close();
    }
}
