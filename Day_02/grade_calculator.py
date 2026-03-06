while True:
    # 1. Prompt for student's name
    name = input("\nEnter student name (or type 'Exit' to quit): ")
    
    # Check for exit condition immediately
    if name.lower() == 'exit':
        print("Exiting program. Goodbye!")
        break

    marks = []
    subjects = ['First', 'Second', 'Third']

    # 2. Prompt for three separate marks with validation
    for i in range(3):
        while True:
            try:
                score = float(input(f"Enter marks for {subjects[i]} subject (0-100): "))
                if 0 <= score <= 100:
                    marks.append(score)
                    break
                else:
                    print("Error: Score must be between 0 and 100.")
            except ValueError:
                print("Invalid input. Please enter a numerical value.")

    # 3. Calculate the average
    average = sum(marks) / 3

    # 4 & 5. Determine Pass/Fail and Grade assignment
    if average >= 75:
        grade = "A"
        status = "Pass"
    elif average >= 60:
        grade = "B"
        status = "Pass"
    elif average >= 40:
        grade = "C"
        status = "Pass"
    else:
        grade = "Fail"
        status = "Fail"

    # 6. Print detailed report
    print("-" * 30)
    print(f"STUDENT REPORT: {name.upper()}")
    print("-" * 30)
    print(f"Average Mark: {average:.2f}")
    print(f"Status:       {status}")
    print(f"Final Grade:  {grade}")
    print("-" * 30)