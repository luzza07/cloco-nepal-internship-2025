from django.shortcuts import render
from django.http import HttpResponse

def main(request):
    return render(request, 'calculator/calc.html')

def calculate(request):
    if request.method == "POST":
        num1 = request.POST.get("num1")
        num2 = request.POST.get("num2")
        operator = request.POST.get("operator")

        if not num1 or not num2 or not operator:
            return HttpResponse("Error: Missing input values.")

        try:
            num1 = float(num1)
            num2 = float(num2)
        except ValueError:
            return HttpResponse("Error: Invalid number format.")

        result = None

        if operator == "add":
            result = num1 + num2
        elif operator == "subtract":
            result = num1 - num2
        elif operator == "multiply":
            result = num1 * num2
        elif operator == "divide":
            if num2 == 0:
                return HttpResponse("Error: Division by zero is not allowed.")
            result = num1 / num2
        else:
            return HttpResponse("Error: Invalid operation.")

        return render(request, "calculator/calc.html", {"result": result})

    return HttpResponse("Method not allowed.", status=405)
