//3. Sistema para Calcular el area y perimetro de un triangulo
package Introducción.TallerPractico.EjerciciosSecuenciales;

import java.util.Scanner;

public class areaFigura {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Ingrese la base del triangulo ->");
        int base = scanner.nextInt();
        System.out.println("Ingrese la altura del triangulo ->");
        int altura = scanner.nextInt();

        int area = (base*altura)/2;
        int hipotenusa = (int)Math.sqrt((float)Math.pow(base,2)+(float)Math.pow(altura,2));
        int perimetro = base + altura + hipotenusa;

        System.out.println("El area del triangulo es: "+area+"cm");
        System.out.println("La hipotenusa para poder hayar el perimetro del triangulo es: "+hipotenusa+"cm");
        System.out.println("El perimetro del triangulo es: "+perimetro+"cm");

        scanner.close();
    }
}