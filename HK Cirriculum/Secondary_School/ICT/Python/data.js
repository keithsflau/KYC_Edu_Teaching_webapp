// Python Interactive Lab Data
const keywordInfo = {
  "print": {
    "desc": "把文字或數值輸出到畫面",
    "syntax": "print(value, sep=' ', end='\\n')"
  },
  "input": {
    "desc": "從鍵盤讀取輸入",
    "syntax": "input(prompt)"
  },
  "int": {
    "desc": "轉成整數",
    "syntax": "int(value)"
  },
  "float": {
    "desc": "轉成小數",
    "syntax": "float(value)"
  },
  "str": {
    "desc": "轉成字串",
    "syntax": "str(value)"
  },
  "if": {
    "desc": "條件為真時才執行",
    "syntax": "if condition:"
  },
  "elif": {
    "desc": "前一個條件為假時再檢查",
    "syntax": "elif condition:"
  },
  "else": {
    "desc": "所有條件都為假時執行",
    "syntax": "else:"
  },
  "for": {
    "desc": "逐一走訪一串資料",
    "syntax": "for item in sequence:"
  },
  "while": {
    "desc": "條件為真時重複",
    "syntax": "while condition:"
  },
  "in": {
    "desc": "檢查是否包含，或用來走訪",
    "syntax": "item in sequence"
  },
  "range": {
    "desc": "產生一連串數字",
    "syntax": "range(start, stop, step)"
  },
  "def": {
    "desc": "定義函數",
    "syntax": "def function_name(params):"
  },
  "return": {
    "desc": "從函數傳回數值",
    "syntax": "return value"
  },
  "break": {
    "desc": "提早離開循環",
    "syntax": "break"
  },
  "continue": {
    "desc": "跳到下一輪循環",
    "syntax": "continue"
  },
  "True": {
    "desc": "布林值：真",
    "syntax": "True"
  },
  "False": {
    "desc": "布林值：假",
    "syntax": "False"
  },
  "None": {
    "desc": "代表沒有值",
    "syntax": "None"
  },
  "and": {
    "desc": "邏輯與",
    "syntax": "a and b"
  },
  "or": {
    "desc": "邏輯或",
    "syntax": "a or b"
  },
  "not": {
    "desc": "邏輯非",
    "syntax": "not a"
  },
  "len": {
    "desc": "取得長度",
    "syntax": "len(sequence)"
  },
  "append": {
    "desc": "加到清單末尾",
    "syntax": "list.append(item)"
  },
  "remove": {
    "desc": "移除第一個相符項目",
    "syntax": "list.remove(item)"
  },
  "pop": {
    "desc": "移除並傳回指定位置的項目",
    "syntax": "list.pop(index)"
  },
  "insert": {
    "desc": "插入到指定位置",
    "syntax": "list.insert(index, item)"
  },
  "clear": {
    "desc": "清空清單",
    "syntax": "list.clear()"
  },
  "reverse": {
    "desc": "原地反轉清單",
    "syntax": "list.reverse()"
  },
  "sort": {
    "desc": "原地排序清單",
    "syntax": "list.sort()"
  },
  "sep": {
    "desc": "print 的分隔符號",
    "syntax": "print(a, b, sep=',')"
  },
  "end": {
    "desc": "print 結尾的字元",
    "syntax": "print(a, end=' ')"
  },
  "import": {
    "desc": "匯入模組",
    "syntax": "import module_name"
  },
  "math": {
    "desc": "數學函數模組",
    "syntax": "import math"
  },
  "pi": {
    "desc": "圓周率 π",
    "syntax": "math.pi"
  }
};

const curriculum = [
  {
    "id": "1.1",
    "title": "1.1 Python 簡介",
    "subtopics": [
      {
        "id": "intro",
        "title": "甚麼是 Python？",
        "content": "Python is a popular programming language created by Guido van Rossum in 1991. It is known for its simple, easy-to-read syntax.",
        "task": "Run the code to see your first Python output.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Run the code to see your first Python output.\n",
        "answer": "print(\"Hello, World!\")",
        "answerExplanation": "The print() function outputs text to the console. The text must be enclosed in quotes.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "escape",
        "title": "跳脫字元",
        "content": "Use backslash (\\) to escape special characters:\n\\n = New Line\n\\\" = Double Quote\n\\' = Single Quote\n\\\\ = Backslash",
        "task": "Print a string that contains quotes inside it.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Print a string that contains quotes inside it.\n",
        "answer": "print(\"She said, \\\"Python is amazing!\\\"\")",
        "answerExplanation": "Use \\\" to include double quotes inside a string that is already enclosed in double quotes.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "concat",
        "title": "字串連接",
        "content": "Use the + operator to join strings together. This is called concatenation.",
        "task": "Combine three strings into one sentence.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Combine three strings into one sentence.\n",
        "answer": "print(\"Python\" + \" is \" + \"fun!\")",
        "answerExplanation": "The + operator joins strings together. Note that spaces must be included explicitly.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "sep",
        "title": "sep 參數",
        "content": "The sep parameter defines what character separates multiple items in a print statement. Default is a space.",
        "task": "Print items separated by commas instead of spaces.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Print items separated by commas instead of spaces.\n",
        "answer": "print(\"Python\", \"Java\", \"C++\", sep=\", \")",
        "answerExplanation": "The sep parameter changes the separator between printed items from the default space to a comma and space.",
        "keywords": [
          "print",
          "sep"
        ]
      },
      {
        "id": "end",
        "title": "end 參數",
        "content": "The end parameter defines what prints at the end of the line. Default is a newline (\\n).",
        "task": "Print two statements on the same line.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Print two statements on the same line.\n",
        "answer": "print(\"Hello\", end=\" \")\nprint(\"World!\")",
        "answerExplanation": "Setting end=\" \" replaces the default newline with a space, so the next print continues on the same line.",
        "keywords": [
          "print",
          "end"
        ]
      }
    ]
  },
  {
    "id": "2.1",
    "title": "2.1 基本語法與變數",
    "subtopics": [
      {
        "id": "q1_extension",
        "title": "Q1：Python 檔案副檔名",
        "content": "Python Program Structure:\n• Code is written in a text file with a .py extension\n• Use a text editor or IDE to write and run programs\n• print() is a built-in function that outputs text to the console\n• Strings are enclosed in quotes",
        "task": "What file extension is used for Python programs?\n\nOptions:\nA) .py\nB) .java\nC) .txt\nD) .html",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：What file extension is used for Python programs?\n",
        "answer": "# Answer: A) .py\n# Python files use the .py extension\nprint(\"Hello, World!\")",
        "answerExplanation": "Answer: A) .py\n\nPython source code files always use the .py extension. This tells the computer that the file contains Python code.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q2_comments",
        "title": "Q2：單行註解",
        "content": "Comments:\n• Use # for single-line comments\n• Comments help explain code and are ignored during execution\n• Comments make your code easier to understand",
        "task": "How do you write a single-line comment in Python?\n\nOptions:\nA) # This is a comment\nB) // This is a comment\nC) <!-- This is a comment -->\nD) /* This is a comment */",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：How do you write a single-line comment in Python?\n",
        "answer": "# Answer: A) # This is a comment\n# In Python, single-line comments start with #\nprint(\"Comments are useful!\")",
        "answerExplanation": "Answer: A) # This is a comment\n\nPython uses the hash symbol (#) for single-line comments. Everything after # on that line is ignored by Python.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q3_indentation",
        "title": "Q3：為甚麼縮排重要",
        "content": "Indentation:\n• Essential for defining code blocks (loops, conditionals)\n• Use consistent spaces (commonly 4 spaces)\n• Python uses indentation instead of braces {} like other languages",
        "task": "Why is indentation important in Python?\n\nOptions:\nA) To define the structure and flow of the code\nB) To make the code look nice\nC) To slow down execution\nD) To create variables",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Why is indentation important in Python?\n",
        "answer": "# Answer: A) To define the structure and flow of the code\nif True:\n    print(\"This is indented correctly.\")\n    print(\"All code in this block must be indented\")",
        "answerExplanation": "Answer: A) To define the structure and flow of the code\n\nPython uses indentation to define code blocks. Unlike other languages that use braces {}, Python requires consistent indentation (usually 4 spaces) to show which code belongs together.",
        "keywords": [
          "if",
          "True",
          "print"
        ]
      },
      {
        "id": "q4_indent_error",
        "title": "Q4：缺少縮排",
        "content": "What happens when you forget to indent?\n• Python will raise an IndentationError\n• The code will not run until the error is fixed\n• Always check your indentation when debugging",
        "task": "What will happen if you forget to indent a block of code in Python?\n\nOptions:\nA) An IndentationError will occur\nB) The code will run without any issues\nC) The code will execute twice\nD) The code will execute in reverse order",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：What will happen if you forget to indent a block of code in Python?\n",
        "answer": "# Answer: A) An IndentationError will occur\n# Correct indentation example:\nif True:\n    print(\"Indented correctly!\")\n\n# Without indentation, Python raises IndentationError",
        "answerExplanation": "Answer: A) An IndentationError will occur\n\nPython requires proper indentation for code blocks. If you forget to indent after if, for, while, def, etc., Python will raise an IndentationError and refuse to run the code.",
        "keywords": [
          "if",
          "True",
          "print"
        ]
      },
      {
        "id": "q5_variables",
        "title": "Q5：建立變數",
        "content": "Variables and Data Types:\n\nIntegers: Whole numbers without decimals (e.g., age = 16)\nFloats: Numbers with decimals (e.g., height = 5.4)\nStrings: Sequence of characters in quotes (e.g., name = \"Alice\")",
        "task": "Create variables for your favourite number, height, and name, then print them out.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Create variables for your favourite number, height, and name, then print them ou\n",
        "answer": "# Sample answer with different values\nfavourite_number = 42\nheight = 1.75\nname = \"Alice\"\n\nprint(\"My favourite number is\", favourite_number)\nprint(\"My height is\", height)\nprint(\"My name is\", name)",
        "answerExplanation": "Variables store data of different types:\n• favourite_number is an integer (whole number)\n• height is a float (decimal number)\n• name is a string (text in quotes)\n\nYou can use any values you like!",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q6_valid_name",
        "title": "Q6：合法的變數名稱",
        "content": "Rules for Naming Variables:\n1. Begin with a letter or underscore (_)\n2. Use letters, numbers, or underscores after first character\n3. Case-sensitive (age and Age are different)\n4. No spaces allowed (use underscores)\n5. Avoid Python keywords (if, class, def, return)\n6. Use descriptive names\n7. Avoid special characters (@, #, $)",
        "task": "Which of the following is a valid Python variable name?\n\nOptions:\nA) total_sum\nB) 2ndValue\nC) first-name\nD) class",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Which of the following is a valid Python variable name?\n",
        "answer": "# Answer: A) total_sum\n# Valid variable names:\ntotal_sum = 100    # Valid: letters and underscore\n_value = 50        # Valid: starts with underscore\nage2 = 25          # Valid: letters and numbers\nfirst_name = \"Alice\"  # Valid: underscore instead of space\n\n# Invalid examples:\n# 2ndValue - Cannot start with number\n# first-name - Cannot use hyphen\n# class - Reserved keyword\n\nprint(total_sum, _value, age2, first_name)",
        "answerExplanation": "Answer: A) total_sum\n\nRules:\n• total_sum ✓ - Uses letters and underscore\n• 2ndValue ✗ - Cannot start with a number\n• first-name ✗ - Cannot use hyphens (use underscore)\n• class ✗ - Reserved Python keyword",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q7_keywords",
        "title": "Q7：不要用關鍵字當變數名",
        "content": "Python Keywords:\n• Reserved words with special meanings\n• Cannot be used as variable names\n• Examples: if, else, for, while, class, def, return, True, False, None",
        "task": "Why should you avoid using Python keywords as variable names?\n\nOptions:\nA) They are reserved for special functions in Python\nB) They are too long\nC) They make the code run faster\nD) They are case-sensitive",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Why should you avoid using Python keywords as variable names?\n",
        "answer": "# Answer: A) They are reserved for special functions in Python\n\n# Keywords have special meanings:\n# if - conditional statement\n# for - loop\n# def - function definition\n# class - class definition\n\n# Use alternative names:\nuser_class = \"Beginner\"  # Instead of \"class\"\nis_valid = True          # Instead of using \"True\" as name\nprint(user_class, is_valid)",
        "answerExplanation": "Answer: A) They are reserved for special functions in Python\n\nPython keywords like if, for, while, class, def have special meanings in the language. Using them as variable names would confuse Python about whether you mean the keyword or a variable.",
        "keywords": [
          "print",
          "True"
        ]
      },
      {
        "id": "q8_data_types",
        "title": "Q8：DSE 2012 資料類型",
        "content": "Choosing Appropriate Data Types:\n\nTemperature: 25.8 → Real/Float (has decimal)\nUV index: 4 → Integer (whole number)\nAir pollution: moderate → String (text)\n\nNote: Data type names vary across languages. In Python: float, int, str",
        "task": "Tom wants to store weather information:\nTemperature: 25.8\nUV index: 4\nAir pollution: moderate\n\nWhich data types are most appropriate?\n\nA) Integer, Real, String\nB) Real, Real, Integer\nC) Real, Integer, String\nD) String, Integer, Real",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Tom wants to store weather information:\n",
        "answer": "# Answer: C) Real, Integer, String\n\ntemperature = 25.8      # Real/Float - has decimal point\nuv_index = 4            # Integer - whole number, no decimal\nair_pollution = \"moderate\"  # String - text data\n\nprint(\"Temperature:\", temperature, type(temperature))\nprint(\"UV Index:\", uv_index, type(uv_index))\nprint(\"Air Pollution:\", air_pollution, type(air_pollution))",
        "answerExplanation": "Answer: C) Real, Integer, String\n\n• Temperature (25.8) has a decimal → Real/Float\n• UV index (4) is a whole number → Integer\n• Air pollution (\"moderate\") is text → String",
        "keywords": [
          "print"
        ]
      }
    ]
  },
  {
    "id": "2.2",
    "title": "2.2 輸入語句",
    "subtopics": [
      {
        "id": "q1_colour",
        "title": "Q1：輸入喜歡的顏色",
        "content": "Using input() for User Input:\n• input() function reads a line from user input\n• Always returns a string\n• You can include a prompt message inside the parentheses",
        "task": "Modify the program to ask for the user's favourite colour and print a message using that colour.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Modify the program to ask for the user's favourite colour and print a message us\n",
        "answer": "colour = input(\"Enter your favourite colour: \")\nprint(\"Your favourite colour is \" + colour + \"!\")\n# Or using comma separation:\n# print(\"Your favourite colour is\", colour + \"!\")",
        "answerExplanation": "The input() function displays the prompt and waits for user input. The entered value is stored in the variable 'colour' as a string, which is then used in the print statement.",
        "keywords": [
          "input",
          "print"
        ]
      },
      {
        "id": "q2_age_calc",
        "title": "Q2：年齡計算",
        "content": "Converting Input to Numbers:\n• input() always returns a string\n• Use int() to convert string to integer\n• Use float() to convert string to decimal number",
        "task": "Write a program that asks the user for their birth year and calculates their age.\n\nSample output:\nEnter your birth year: 2000\nYou are 24 years old.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Write a program that asks the user for their birth year and calculates their age\n",
        "answer": "birth_year = int(input(\"Enter your birth year: \"))\ncurrent_year = 2026\nage = current_year - birth_year\nprint(\"You are\", age, \"years old.\")",
        "answerExplanation": "Key points:\n1. Use int() to convert the input string to an integer\n2. Subtract birth year from current year to get age\n3. The calculation only works with numbers, hence the int() conversion",
        "keywords": [
          "int",
          "input",
          "print"
        ]
      },
      {
        "id": "q3_addition",
        "title": "Q3：簡單加法",
        "content": "Performing Calculations with Input:\n• Get numbers from user with input()\n• Convert to int or float for calculations\n• Print the result",
        "task": "Write a program that asks for two numbers and prints their sum.\n\nSample output:\nEnter the first number: 5\nEnter the second number: 10\nThe sum is: 15",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Write a program that asks for two numbers and prints their sum.\n",
        "answer": "num1 = int(input(\"Enter the first number: \"))\nnum2 = int(input(\"Enter the second number: \"))\nsum_result = num1 + num2\nprint(\"The sum is:\", sum_result)",
        "answerExplanation": "Both inputs must be converted to integers using int() before adding them. Without conversion, the + operator would concatenate strings instead of adding numbers (e.g., \"5\" + \"10\" = \"510\").",
        "keywords": [
          "int",
          "input",
          "print"
        ]
      },
      {
        "id": "q4_greeting",
        "title": "Q4：個人化問候",
        "content": "Combining Multiple Inputs:\n• You can ask for multiple pieces of information\n• Combine strings using + or commas in print()\n• Create personalized messages",
        "task": "Ask the user for their first and last name, then print a personalized greeting.\n\nSample output:\nEnter your first name: Alice\nEnter your last name: Smith\nHello, Alice Smith!",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Ask the user for their first and last name, then print a personalized greeting.\n",
        "answer": "first_name = input(\"Enter your first name: \")\nlast_name = input(\"Enter your last name: \")\nprint(\"Hello, \" + first_name + \" \" + last_name + \"!\")\n# Alternative using comma:\n# print(\"Hello,\", first_name, last_name + \"!\")",
        "answerExplanation": "String concatenation using + joins strings together. Remember to include spaces where needed. The comma method in print() automatically adds spaces between items.",
        "keywords": [
          "input",
          "print"
        ]
      }
    ]
  },
  {
    "id": "2.3",
    "title": "2.3 輸入練習",
    "subtopics": [
      {
        "id": "q1_turn_100",
        "title": "Q1：姓名與年齡問候",
        "content": "Create a program that:\n1. Asks for the user's name (store in variable 'name')\n2. Asks for their age (convert to int, store in 'age')\n3. Calculate the year they will turn 100:\n   year_turn_100 = current_year + (100 - age)\n4. Print a greeting with their name and the year they'll turn 100",
        "task": "Sample output:\nEnter your name: Alice\nEnter your age: 16\nHello, Alice! You will turn 100 years old in the year 2108.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Sample output:\n",
        "answer": "name = input(\"Enter your name: \")\nage = int(input(\"Enter your age: \"))\n\ncurrent_year = 2026\nyear_turn_100 = current_year + (100 - age)\n\nprint(\"Hello, \" + name + \"! You will turn 100 years old in the year \" + str(year_turn_100) + \".\")",
        "answerExplanation": "Key steps:\n1. Get name as string (no conversion needed)\n2. Get age and convert to int\n3. Calculate: year_turn_100 = current_year + (100 - age)\n4. Use str() to convert the year back to string for concatenation",
        "keywords": [
          "input",
          "int",
          "str",
          "print"
        ]
      },
      {
        "id": "q2_circle",
        "title": "Q2：圓面積",
        "content": "Write a program that calculates the area of a circle:\n• Area = π × radius²\n• You can use 3.14159 for π, or import math and use math.pi\n• Get the radius from user input\n• Convert to float for decimal values",
        "task": "Sample output:\nEnter the radius of the circle: 3\nThe area of the circle is: 28.274333882308138\n\nEnter the radius of the circle: 1.8\nThe area of the circle is: 10.17876019763093",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Sample output:\n",
        "answer": "pi = 3.14159265358979\n\nradius = float(input(\"Enter the radius of the circle: \"))\narea = pi * radius * radius\n# Or: area = pi * radius ** 2\n\nprint(\"The area of the circle is:\", area)",
        "answerExplanation": "Formula: Area = π × r²\n\nUse float() for the radius to handle decimal inputs. The ** operator can be used for exponentiation (radius ** 2), or simply multiply radius by itself.",
        "keywords": [
          "float",
          "input",
          "print"
        ]
      }
    ]
  },
  {
    "id": "3.1",
    "title": "3.1 條件句",
    "subtopics": [
      {
        "id": "intro_conditionals",
        "title": "條件句簡介",
        "content": "Conditional statements allow you to execute specific blocks of code based on certain conditions.\n\nIf Statement: Checks a condition. If True, executes the code block.\n\nElif Statement: Stands for \"else if\". Checks another condition if previous if is False.\n\nElse Statement: Executes if all preceding conditions are False.\n\nComparison Operators:\n== Equal to\n!= Not equal to\n> Greater than\n< Less than\n>= Greater than or equal to\n<= Less than or equal to",
        "task": "Study the syntax of if, elif, and else statements.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Study the syntax of if, elif, and else statements.\n",
        "answer": "# If-Elif-Else Syntax\nscore = 85\nif score >= 90:\n    print(\"Grade: A\")\nelif score >= 80:\n    print(\"Grade: B\")\nelse:\n    print(\"Grade: C or below\")\n\n# With score = 85, the output is \"Grade: B\"\n# because 85 >= 80 is True",
        "answerExplanation": "The conditions are checked in order:\n1. score >= 90? No (85 is not >= 90)\n2. score >= 80? Yes (85 >= 80)\n→ Prints \"Grade: B\"\n\nThe else block only runs if ALL conditions are False.",
        "keywords": [
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "operators",
        "title": "算術運算子",
        "content": "Basic Arithmetic Operators:\n\n+ Addition: 3 + 2 = 5\n- Subtraction: 5 - 2 = 3\n* Multiplication: 3 * 2 = 6\n/ Division (float): 5 / 2 = 2.5\n// Floor Division: 5 // 2 = 2\n% Modulus (remainder): 5 % 2 = 1\n** Exponentiation: 3 ** 2 = 9",
        "task": "Try out different arithmetic operators.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Try out different arithmetic operators.\n",
        "answer": "print(\"Addition: 3 + 2 =\", 3 + 2)           # 5\nprint(\"Subtraction: 5 - 2 =\", 5 - 2)        # 3\nprint(\"Multiplication: 3 * 2 =\", 3 * 2)     # 6\nprint(\"Division: 5 / 2 =\", 5 / 2)           # 2.5\nprint(\"Floor Division: 5 // 2 =\", 5 // 2)   # 2\nprint(\"Modulus: 5 % 2 =\", 5 % 2)            # 1\nprint(\"Exponentiation: 3 ** 2 =\", 3 ** 2)   # 9",
        "answerExplanation": "Key operators:\n• / gives decimal result (2.5)\n• // gives integer result, rounded down (2)\n• % gives remainder after division (1)\n• ** raises to power (3² = 9)",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q1_event_code",
        "title": "Q1：活動代碼比對",
        "content": "用 if / elif / else 比對活動代碼。\n代碼正確就印出「歡迎參加」，空白就提示「請輸入代碼」，其他情況印出「代碼不符」。\n這是分支練習，不要用來試探他人帳戶。",
        "task": "按執行程式，輸入 river42，確認輸出「歡迎參加」。",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：按執行程式，輸入 river42，確認輸出「歡迎參加」。\n",
        "answer": "code = \"river42\"\nuser_input = input(\"Enter the event code: \")\n\nif user_input == code:\n    print(\"歡迎參加\")\nelif user_input == \"\":\n    print(\"請輸入代碼\")\nelse:\n    print(\"代碼不符\")",
        "answerExplanation": "elif 處理第二種情況。這只是課堂上的分支練習，不是登入系統。",
        "keywords": [
          "input",
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "q2_grading",
        "title": "Q2：等級（由低分判斷）",
        "content": "Determine a student's grade based on their score.\n\nOriginal logic:\nscore >= 90 → A\nscore >= 80 → B\nscore >= 70 → C\nscore >= 60 → D\nelse → F\n\nRewrite with reversed conditions (checking F first, then D, C, B, else A).",
        "task": "Fill in the blanks:\nif score < 60: print(\"Grade: F\")\nelif score < 70: print(\"Grade: D\")\nelif score < 80: print(\"Grade: C\")\nelif score < 90: print(\"Grade: B\")\nelse: print(\"Grade: A\")",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Fill in the blanks:\n",
        "answer": "score = 85\n\n# Reversed conditions (checking from lowest to highest)\nif score < 60:\n    print(\"Grade: F\")    # 0-59\nelif score < 70:\n    print(\"Grade: D\")    # 60-69\nelif score < 80:\n    print(\"Grade: C\")    # 70-79\nelif score < 90:\n    print(\"Grade: B\")    # 80-89\nelse:\n    print(\"Grade: A\")    # 90+",
        "answerExplanation": "Reversed logic:\n• score < 60 → F (catches 0-59)\n• score < 70 → D (catches 60-69, since < 60 already handled)\n• score < 80 → C (catches 70-79)\n• score < 90 → B (catches 80-89)\n• else → A (everything 90 and above)",
        "keywords": [
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "q3_even_odd",
        "title": "Q3：奇數或偶數",
        "content": "Check if a number is even or odd using the modulus operator (%).\n\nModify the program to:\n1. Ask the user to input a number\n2. Determine if the number is even or odd\n3. Also check if the number is positive, negative, or zero",
        "task": "Sample outputs:\nEnter a number: 4 → Even, Positive\nEnter a number: -3 → Odd, Negative\nEnter a number: 0 → Even, Zero",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Sample outputs:\n",
        "answer": "number = int(input(\"Enter a number: \"))\n\n# Check even or odd\nif number % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")\n\n# Check positive, negative, or zero\nif number > 0:\n    print(\"Positive\")\nelif number < 0:\n    print(\"Negative\")\nelse:\n    print(\"Zero\")",
        "answerExplanation": "Key concepts:\n• number % 2 == 0: A number is even if dividing by 2 leaves no remainder\n• number % 2 != 0 (or == 1): Odd numbers have remainder 1\n• 0 is considered even (0 % 2 = 0)\n• Separate if-elif-else blocks for each check",
        "keywords": [
          "int",
          "input",
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "q4_movie_tickets",
        "title": "Q4：電影票",
        "content": "Movie ticket prices based on age:\n\nUnder 12: $50\n12 to 17: $70\n18 to 59: $100\n60 and above: $60\n\nWrite a program that inputs age and outputs the ticket price.",
        "task": "Boundary cases:\nAge 12 → $70\nAge 18 → $100\nAge 60 → $60\n\nTypical cases:\nAge 10 → $50\nAge 15 → $70\nAge 50 → $100\nAge 65 → $60",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Boundary cases:\n",
        "answer": "age = int(input(\"Enter your age: \"))\n\nif age < 12:\n    print(\"Ticket price: $50\")    # Under 12\nelif age <= 17:\n    print(\"Ticket price: $70\")    # 12-17\nelif age <= 59:\n    print(\"Ticket price: $100\")   # 18-59\nelse:\n    print(\"Ticket price: $60\")    # 60+",
        "answerExplanation": "Boundary analysis:\n• age < 12: Under 12 (0-11) → $50\n• age <= 17: Ages 12-17 → $70\n• age <= 59: Ages 18-59 → $100\n• else: Ages 60+ → $60 (senior discount)\n\nNote: Conditions are checked in order, so each range is exclusive.",
        "keywords": [
          "int",
          "input",
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "q5_bmi",
        "title": "Q5：BMI 計算",
        "content": "Calculate BMI (Body Mass Index) and categorize it.\n\nFormula: BMI = weight / (height²)\n\nBMI Categories:\nBelow 18.5: Underweight\n18.5 - 24.9: Normal weight\n25.0 - 29.9: Overweight\n30.0 and above: Obesity",
        "task": "Typical cases:\n60kg, 1.9m → Underweight\n55kg, 1.7m → Normal weight\n50kg, 1.3m → Overweight\n55kg, 1.2m → Obesity",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Typical cases:\n",
        "answer": "weight = float(input(\"Enter your weight in kg: \"))\nheight = float(input(\"Enter your height in meters: \"))\n\nbmi = weight / (height * height)\n# Or: bmi = weight / height ** 2\n\nprint(\"Your BMI is:\", round(bmi, 2))\n\nif bmi < 18.5:\n    print(\"Underweight\")\nelif bmi < 25:\n    print(\"Normal weight\")\nelif bmi < 30:\n    print(\"Overweight\")\nelse:\n    print(\"Obesity\")",
        "answerExplanation": "BMI Formula: weight ÷ height²\n\nCategories:\n• < 18.5: Underweight\n• 18.5-24.9: Normal\n• 25-29.9: Overweight\n• ≥ 30: Obesity\n\nUse float() for decimal inputs. round(bmi, 2) rounds to 2 decimal places.",
        "keywords": [
          "float",
          "input",
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "test_data",
        "title": "測試數據要考慮甚麼",
        "content": "When testing conditional statements:\n\n1. Identify Conditions: List all conditions in if/elif/else\n\n2. Boundary Values: Test at condition boundaries\n   Example: If age < 18, test age=17 and age=18\n\n3. Typical Values: Test expected values within each range\n\n4. Edge Cases: Test extreme or unusual values (negative, very large)\n\n5. Invalid Inputs: Test outside expected range/format\n\n6. All Branches: Ensure each branch executes at least once",
        "task": "For a grading system, identify appropriate test cases:\n\nBoundary: score = 89, score = 90\nTypical: score = 85, score = 75\nEdge: score = 0, score = 100\nInvalid: score = -10",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：For a grading system, identify appropriate test cases:\n",
        "answer": "# Comprehensive test data for grading system\ntest_scores = [\n    90,   # Boundary: exactly A\n    89,   # Boundary: just below A (B)\n    80,   # Boundary: exactly B\n    79,   # Boundary: just below B (C)\n    70,   # Boundary: exactly C\n    60,   # Boundary: exactly D\n    59,   # Boundary: just below D (F)\n    0,    # Edge: minimum\n    100,  # Edge: maximum\n    85,   # Typical B\n    75,   # Typical C\n]\n\nfor score in test_scores:\n    if score >= 90:\n        grade = \"A\"\n    elif score >= 80:\n        grade = \"B\"\n    elif score >= 70:\n        grade = \"C\"\n    elif score >= 60:\n        grade = \"D\"\n    else:\n        grade = \"F\"\n    print(\"Score:\", score, \"-> Grade:\", grade)",
        "answerExplanation": "Good test data includes:\n\n1. Boundary values: 90, 89, 80, 79, 70, 69, 60, 59\n   (Test exactly at and just below each threshold)\n\n2. Typical values: 85, 75, 65, 45\n   (Values clearly in each range)\n\n3. Edge cases: 0, 100\n   (Extreme valid values)\n\n4. All branches must be tested at least once.",
        "keywords": [
          "for",
          "in",
          "if",
          "elif",
          "else",
          "print"
        ]
      }
    ]
  },
  {
    "id": "3.2",
    "title": "3.2 if、elif、else 練習",
    "subtopics": [
      {
        "id": "q1_traffic",
        "title": "Q1：紅綠燈",
        "content": "Simulate a traffic light system:\n\nLight → Output\nRed → Stop.\nAmber → Slow down.\nGreen → Go!\n\nWrite a program that inputs the colour and outputs the appropriate message.\n\nTest all branches (red, amber, green).",
        "task": "Sample outputs:\nEnter light colour: red → Stop.\nEnter light colour: amber → Slow down.\nEnter light colour: green → Go!",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Sample outputs:\n",
        "answer": "light = input(\"Enter light colour: \")\n\nif light == \"red\":\n    print(\"Stop.\")\nelif light == \"amber\":\n    print(\"Slow down.\")\nelif light == \"green\":\n    print(\"Go!\")\nelse:\n    print(\"Invalid colour\")",
        "answerExplanation": "Uses string comparison (==) to match the input with expected values. The else clause handles any unexpected input. Note: This is case-sensitive, so \"Red\" won't match \"red\".",
        "keywords": [
          "input",
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "q2_discount",
        "title": "Q2：折扣計算",
        "content": "Calculate discount based on purchase amount:\n\nGreater than $100 → 20% discount\nGreater than $50, up to $100 → 10% discount\n$50 or less → 5% discount\n\nSelling price = Purchase amount × (1 - discount%)",
        "task": "Boundary cases:\n$100 → 10% discount, $90.0\n$50 → 5% discount, $47.5\n\nTypical cases:\n$120 → 20% discount, $96.0\n$70 → 10% discount, $63.0\n$30 → 5% discount, $28.5",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Boundary cases:\n",
        "answer": "amount = float(input(\"Enter purchase amount: \"))\n\nif amount > 100:\n    discount = 0.20    # 20%\nelif amount > 50:\n    discount = 0.10    # 10%\nelse:\n    discount = 0.05    # 5%\n\nselling_price = amount * (1 - discount)\nprint(\"Discount:\", str(int(discount * 100)) + \"%\")\nprint(\"Selling price: $\" + str(selling_price))",
        "answerExplanation": "Boundary analysis:\n• > 100: 20% discount (101, 150, etc.)\n• > 50 and <= 100: 10% discount (51-100)\n• <= 50: 5% discount (0-50)\n\nNote: $100 gets 10%, not 20% (must be GREATER than 100)",
        "keywords": [
          "float",
          "input",
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "q3_temperature",
        "title": "Q3：溫度轉換",
        "content": "Convert Celsius to Fahrenheit and categorize:\n\nFormula: Fahrenheit = (Celsius × 9/5) + 32\n\nCategories (in Fahrenheit):\n100 or above → Hot\n60 or above → Warm\nBelow 60 → Cold",
        "task": "Sample output:\nEnter temperature in Celsius: 30\nTemperature in Fahrenheit: 86.0°F, Category: Warm",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Sample output:\n",
        "answer": "celsius = float(input(\"Enter temperature in Celsius: \"))\n\nfahrenheit = (celsius * 9 / 5) + 32\n# Or: fahrenheit = celsius * 1.8 + 32\n\nif fahrenheit >= 100:\n    category = \"Hot\"\nelif fahrenheit >= 60:\n    category = \"Warm\"\nelse:\n    category = \"Cold\"\n\nprint(\"Temperature in Fahrenheit: \" + str(fahrenheit) + \"°F\")\nprint(\"Category:\", category)",
        "answerExplanation": "Conversion: F = C × 9/5 + 32\n\nExamples:\n• 30°C = 86°F (Warm)\n• 0°C = 32°F (Cold)\n• 40°C = 104°F (Hot)\n\nCategories based on Fahrenheit scale.",
        "keywords": [
          "float",
          "input",
          "if",
          "elif",
          "else",
          "print"
        ]
      },
      {
        "id": "q4_dse_test_data",
        "title": "Q4：DSE 2018 測試數據",
        "content": "DSE 2018 ICT MC 31:\n\nStudy the algorithm:\nINPUT N\nIF n < -6 THEN\n   y = y + 2\nELSE IF n > 9 THEN\n   y = y - 2\nELSE\n   y = y * 2\n\nWhich set of input data is most suitable for testing?\nA. -6, 0, 9\nB. -2, 0, 1, 2\nC. -20, -6, 0, 9, 15\nD. -20, -10, 0, 1, 10, 20",
        "task": "The correct answer is C.\n\nWhy? It includes:\n• -20 (tests n < -6, typical case)\n• -6 (boundary value)\n• 0 (typical middle case)\n• 9 (boundary value)\n• 15 (tests n > 9, typical case)",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：選出能覆蓋邊界和各分支的測試數據，再自己寫程式試跑。\n",
        "answer": "# Answer: C) -20, -6, 0, 9, 15\n\ndef test_algorithm(n, y=0):\n    if n < -6:\n        y = y + 2      # Branch 1\n    elif n > 9:\n        y = y - 2      # Branch 2\n    else:\n        y = y * 2      # Branch 3 (else)\n    return y\n\n# Option C provides:\n# -20: Tests branch 1 (n < -6), typical case\n# -6:  Boundary value (goes to else, not branch 1)\n# 0:   Tests else branch, typical case\n# 9:   Boundary value (goes to else, not second branch)\n# 15:  Tests branch 2 (n > 9), typical case\n\ntest_data = [-20, -6, 0, 9, 15]\nfor n in test_data:\n    result = test_algorithm(n)\n    print(\"n =\", n, \"-> y =\", result)",
        "answerExplanation": "Answer: C) -20, -6, 0, 9, 15\n\nThis is the best choice because:\n1. -20: Typical value for n < -6\n2. -6: Boundary (exactly -6 goes to else, not first branch)\n3. 0: Typical value for else branch\n4. 9: Boundary (exactly 9 goes to else, not second branch)\n5. 15: Typical value for n > 9\n\nCovers all three branches with both boundary and typical values.",
        "keywords": [
          "def",
          "if",
          "elif",
          "else",
          "return",
          "for",
          "in",
          "print"
        ]
      }
    ]
  },
  {
    "id": "4.1",
    "title": "4.1 for 循環自學",
    "subtopics": [
      {
        "id": "intro_for",
        "title": "for 循環簡介",
        "content": "For Loops: Used to iterate over a sequence (list, string, or range).\n\nIteration: The process of executing a set of statements repeatedly.\n\nThe range() Function:\n• Used to generate a sequence of numbers\n• Syntax: range(start, stop, step)\n• Example: range(0, 10, 2) generates 0, 2, 4, 6, 8\n\nSyntax:\nfor variable in sequence:\n    # code block to execute",
        "task": "Understand the basic syntax of for loops.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Understand the basic syntax of for loops.\n",
        "answer": "# For Loop Syntax\nfor i in range(5):\n    print(i)\n\n# Output: 0, 1, 2, 3, 4 (each on new line)\n# range(5) generates numbers 0 to 4",
        "answerExplanation": "The for loop iterates through each value in the sequence. range(5) generates 0, 1, 2, 3, 4 (stops before 5). The variable i takes each value in turn.",
        "keywords": [
          "for",
          "in",
          "range",
          "print"
        ]
      },
      {
        "id": "q1_list_iterate",
        "title": "Q1：逐一處理清單",
        "content": "You can iterate over each item in a list using a for loop.\n\nExample:\nfruits = ['apple', 'banana', 'cherry']\nfor fruit in fruits:\n    print(fruit)",
        "task": "Type and run the program to iterate over a list of fruits.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Type and run the program to iterate over a list of fruits.\n",
        "answer": "fruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(fruit)\n\n# Output:\n# apple\n# banana\n# cherry",
        "answerExplanation": "The for loop iterates through each element in the fruits list. The variable 'fruit' takes the value of each item in order: first \"apple\", then \"banana\", then \"cherry\".",
        "keywords": [
          "for",
          "in",
          "print"
        ]
      },
      {
        "id": "q2_range",
        "title": "Q2：使用 range",
        "content": "The range() function generates a sequence of numbers.\n\nrange(5) generates: 0, 1, 2, 3, 4\nrange(1, 6) generates: 1, 2, 3, 4, 5\nrange(0, 10, 2) generates: 0, 2, 4, 6, 8",
        "task": "Type and run the program using range().",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Type and run the program using range().\n",
        "answer": "for i in range(5):\n    print(i)\n\n# Output: 0, 1, 2, 3, 4\n# range(5) is equivalent to range(0, 5, 1)",
        "answerExplanation": "range(5) generates numbers from 0 to 4 (5 numbers total). The stop value (5) is not included. Default start is 0, default step is 1.",
        "keywords": [
          "for",
          "in",
          "range",
          "print"
        ]
      },
      {
        "id": "q3_sum",
        "title": "Q3：數字總和",
        "content": "You can use a for loop to calculate the sum of numbers in a list.\n\nUse a variable to accumulate the total as you iterate through the list.",
        "task": "Type and run the program to calculate the sum of numbers.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Type and run the program to calculate the sum of numbers.\n",
        "answer": "numbers = [1, 2, 3, 4, 5]\ntotal = 0\nfor number in numbers:\n    total += number  # Same as: total = total + number\nprint(total)  # Output: 15",
        "answerExplanation": "The accumulator pattern:\n1. Initialize total to 0\n2. Loop through each number\n3. Add each number to total (total += number)\n4. After loop ends, total contains the sum (1+2+3+4+5 = 15)",
        "keywords": [
          "for",
          "in",
          "print"
        ]
      },
      {
        "id": "q4_string",
        "title": "Q4：逐一處理字串",
        "content": "Strings are sequences of characters, so you can iterate through each character using a for loop.",
        "task": "Type and run the program to iterate over each letter in a word.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Type and run the program to iterate over each letter in a word.\n",
        "answer": "word = \"hello\"\nfor letter in word:\n    print(letter)\n\n# Output:\n# h\n# e\n# l\n# l\n# o",
        "answerExplanation": "Strings are sequences of characters. The for loop iterates through each character one at a time. 'letter' takes values: 'h', 'e', 'l', 'l', 'o'.",
        "keywords": [
          "for",
          "in",
          "print"
        ]
      },
      {
        "id": "q5_nested",
        "title": "Q5：巢狀循環",
        "content": "A nested loop is a loop inside another loop. The inner loop runs completely for each iteration of the outer loop.\n\nUseful for working with 2D structures like grids or tables.",
        "task": "Type and run the program with nested loops.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Type and run the program with nested loops.\n",
        "answer": "for i in range(2):      # Outer loop: i = 0, 1\n    for j in range(3):  # Inner loop: j = 0, 1, 2\n        print(i, j)\n\n# Output:\n# 0 0\n# 0 1\n# 0 2\n# 1 0\n# 1 1\n# 1 2",
        "answerExplanation": "Nested loops:\n• Outer loop runs 2 times (i = 0, then i = 1)\n• For each outer iteration, inner loop runs 3 times (j = 0, 1, 2)\n• Total iterations: 2 × 3 = 6",
        "keywords": [
          "for",
          "in",
          "range",
          "print"
        ]
      },
      {
        "id": "q6_break_continue",
        "title": "Q6：break 與 continue",
        "content": "break: Exits the loop immediately when a condition is met.\n\ncontinue: Skips the current iteration and moves to the next one.\n\nThese control statements help manage loop flow.",
        "task": "Test both programs and explain what break and continue do.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Test both programs and explain what break and continue do.\n",
        "answer": "# Using break - exits loop completely when condition is met\nprint(\"Using break:\")\nfor i in range(5):\n    if i == 3:\n        break  # Exit loop when i is 3\n    print(i)\n# Output: 0, 1, 2 (stops before printing 3)\n\nprint()\n\n# Using continue - skips current iteration only\nprint(\"Using continue:\")\nfor i in range(5):\n    if i == 2:\n        continue  # Skip when i is 2\n    print(i)\n# Output: 0, 1, 3, 4 (skips 2)",
        "answerExplanation": "break: Completely exits the loop. When i==3, the loop stops and doesn't process 3 or 4.\n\ncontinue: Skips only the current iteration. When i==2, it skips printing 2 but continues with 3 and 4.",
        "keywords": [
          "for",
          "in",
          "range",
          "if",
          "break",
          "continue",
          "print"
        ]
      }
    ]
  },
  {
    "id": "4.2",
    "title": "4.2 for 循環練習",
    "subtopics": [
      {
        "id": "q1_even",
        "title": "Q1：印出 1 至 20 的偶數",
        "content": "Write a for loop to print even numbers from 1 to 20.",
        "task": "Use range() with a step of 2 to print even numbers.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use range() with a step of 2 to print even numbers.\n",
        "answer": "# Method 1: Using step in range\nfor i in range(2, 21, 2):\n    print(i)\n\n# Method 2: Using modulus\n# for i in range(1, 21):\n#     if i % 2 == 0:\n#         print(i)",
        "answerExplanation": "range(2, 21, 2) starts at 2, ends before 21, steps by 2.\nGenerates: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20\n\nAlternative: Check each number with i % 2 == 0",
        "keywords": [
          "for",
          "in",
          "range",
          "print"
        ]
      },
      {
        "id": "q2_colors",
        "title": "Q2：逐一印出顏色",
        "content": "Print each colour from a given list.\n\ncolors = [\"red\", \"green\", \"blue\", \"yellow\"]",
        "task": "Loop through the colors list and print each color.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Loop through the colors list and print each color.\n",
        "answer": "colors = [\"red\", \"green\", \"blue\", \"yellow\"]\nfor color in colors:\n    print(color)\n\n# Output:\n# red\n# green\n# blue\n# yellow",
        "answerExplanation": "The for loop iterates through each element in the list. The variable 'color' takes each value in sequence.",
        "keywords": [
          "for",
          "in",
          "print"
        ]
      },
      {
        "id": "q3_reverse",
        "title": "Q3：倒序印出每個字母",
        "content": "Use a for loop to print each letter of the word \"Python\" in reverse order.",
        "task": "Use range() with negative step or reverse the string.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use range() with negative step or reverse the string.\n",
        "answer": "# Method 1: Using range with negative step\nword = \"Python\"\nfor i in range(len(word) - 1, -1, -1):\n    print(word[i])\n\n# Method 2: Using string slicing\n# for letter in word[::-1]:\n#     print(letter)\n\n# Output: n, o, h, t, y, P",
        "answerExplanation": "range(len(word)-1, -1, -1) generates indices 5, 4, 3, 2, 1, 0\n• Start: len(word)-1 = 5 (last index)\n• Stop: -1 (goes to 0, stops before -1)\n• Step: -1 (counts backwards)",
        "keywords": [
          "for",
          "in",
          "range",
          "len",
          "print"
        ]
      },
      {
        "id": "q4_grid",
        "title": "Q4：印出 3×3 星號",
        "content": "Use a nested for loop to create a 3x3 grid of asterisks.",
        "task": "Use nested loops with end parameter to create the grid.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use nested loops with end parameter to create the grid.\n",
        "answer": "for i in range(3):          # 3 rows\n    for j in range(3):      # 3 columns\n        print(\"*\", end=\" \") # Print * without newline\n    print()                 # New line after each row\n\n# Output:\n# * * *\n# * * *\n# * * *",
        "answerExplanation": "• Outer loop controls rows (3 times)\n• Inner loop prints 3 asterisks on same line (end=\" \")\n• print() after inner loop creates new line\n• Result: 3×3 grid",
        "keywords": [
          "for",
          "in",
          "range",
          "print",
          "end"
        ]
      },
      {
        "id": "q5_sum_break",
        "title": "Q5：加到 break 為止",
        "content": "Write a for loop to sum numbers from a list of prime numbers until the sum reaches 10, then exit.\n\nprime = [2, 3, 5, 7, 11, 13]",
        "task": "Use break to exit the loop when sum reaches 10.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use break to exit the loop when sum reaches 10.\n",
        "answer": "prime = [2, 3, 5, 7, 11, 13]\ntotal = 0\nfor num in prime:\n    total += num\n    print(\"Added\", num, \"- Total:\", total)\n    if total >= 10:\n        break\nprint(\"Final sum:\", total)\n\n# Output:\n# Added 2 - Total: 2\n# Added 3 - Total: 5\n# Added 5 - Total: 10\n# Final sum: 10",
        "answerExplanation": "The loop adds primes: 2→5→10\nWhen total reaches 10, break exits the loop immediately.\nWithout break, it would continue adding 7, 11, 13.",
        "keywords": [
          "for",
          "in",
          "print",
          "if",
          "break"
        ]
      },
      {
        "id": "q6_prime",
        "title": "Q6：檢查質數",
        "content": "Write a program which inputs an integer and checks whether it is prime or not.\n\nA prime number is greater than 1 and only divisible by 1 and itself.",
        "task": "Use a loop to check divisibility from 2 to n-1.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use a loop to check divisibility from 2 to n-1.\n",
        "answer": "num = int(input(\"Enter an integer: \"))\nis_prime = True\n\nif num < 2:\n    is_prime = False\nelse:\n    for i in range(2, num):\n        if num % i == 0:\n            is_prime = False\n            break\n\nif is_prime:\n    print(str(num) + \" is a prime number\")\nelse:\n    print(str(num) + \" is not a prime number\")",
        "answerExplanation": "Loop from 2 to num-1. If num is divisible by any i, it's not prime. If loop finishes without finding a divisor, it is prime. Special case: numbers integers < 2 are not prime.",
        "keywords": [
          "for",
          "in",
          "range",
          "if",
          "else",
          "break",
          "print"
        ]
      }
    ]
  },
  {
    "id": "4.3",
    "title": "4.3 while 循環",
    "subtopics": [
      {
        "id": "intro_while",
        "title": "while 循環簡介",
        "content": "While Loop: Repeats a block of code as long as a condition is True.\n\nSyntaxes:\nwhile condition:\n    # code to execute",
        "task": "Write a while loop that prints numbers from 1 to 5.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Write a while loop that prints numbers from 1 to 5.\n",
        "answer": "i = 1\nwhile i <= 5:\n    print(i)\n    i += 1\n# Output: 1, 2, 3, 4, 5",
        "answerExplanation": "The loop continues running as long as i <= 5. Inside the loop, we print i and then add 1 to it. When i becomes 6, the condition serves False and the loop stops.",
        "keywords": [
          "while",
          "print"
        ]
      },
      {
        "id": "q1_guess",
        "title": "Q1：猜數字",
        "content": "Create a simple guessing game where the user has to guess a secret number (e.g., 7).\n\nKeep asking for input until they guess correctly.",
        "task": "Use a while loop to prompt the user until the guess matches the secret.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use a while loop to prompt the user until the guess matches the secret.\n",
        "answer": "secret = 7\nguess = int(input(\"Guess the number (1-10): \"))\n\nwhile guess != secret:\n    print(\"Wrong, try again!\")\n    guess = int(input(\"Guess again: \"))\n\nprint(\"Correct! You guessed it.\")",
        "answerExplanation": "The loop checks if 'guess' is NOT equal to 'secret'. If true, it asks again. Once they stick the correct number, the loop exits.",
        "keywords": [
          "while",
          "input",
          "int",
          "if",
          "print"
        ]
      },
      {
        "id": "q2_sum_input",
        "title": "Q2：加到輸入 0 為止",
        "content": "Write a program that keeps asking the user for numbers and adds them to a total.\n\nThe loop should stop when the user enters 0.",
        "task": "Use a while loop to accumulate a sum.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use a while loop to accumulate a sum.\n",
        "answer": "total = 0\nnum = int(input(\"Enter a number (0 to stop): \"))\n\nwhile num != 0:\n    total += num\n    num = int(input(\"Enter next number (0 to stop): \"))\n\nprint(\"Total sum:\", total)",
        "answerExplanation": "We initialize total to 0. Inside the loop, we add the current number to total, then ask for a new number. If 0 is entered, the condition num != 0 becomes False.",
        "keywords": [
          "while",
          "input",
          "int",
          "print"
        ]
      }
    ]
  },
  {
    "id": "5.1",
    "title": "5.1 為甚麼要用清單？",
    "subtopics": [
      {
        "id": "why_lists",
        "title": "只用變數的限制",
        "content": "Imagine you need to store the names of 30 students. Creating 30 variables (student1, student2, ...) is tedious and hard to manage.\n\nLists allow you to store multiple items in a single variable.",
        "task": "Create a list called 'students' with 3 names and print it.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Create a list called 'students' with 3 names and print it.\n",
        "answer": "students = [\"Alice\", \"Bob\", \"Charlie\"]\nprint(students)",
        "answerExplanation": "A list is defined using square brackets []. It can hold multiple values separated by commas.",
        "keywords": [
          "print"
        ]
      }
    ]
  },
  {
    "id": "5.2",
    "title": "5.2 清單：建立、索引、切片",
    "subtopics": [
      {
        "id": "q1_colors",
        "title": "Q1：建立顏色清單",
        "content": "Create a list containing 'red', 'green', 'blue'.",
        "task": "Store it in a variable 'colors' and print the last item.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Store it in a variable 'colors' and print the last item.\n",
        "answer": "colors = [\"red\", \"green\", \"blue\"]\nprint(colors[-1])",
        "answerExplanation": "Negative indexing: -1 refers to the last item.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q2_slicing",
        "title": "Q2：清單切片",
        "content": "Slicing extracts a part of the list. Syntax: list[start:end]",
        "task": "Get the first two items.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Get the first two items.\n",
        "answer": "letters = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nprint(letters[0:2])",
        "answerExplanation": "letters[0:2] gets index 0 and 1. The end index is exclusive.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q3_iterating",
        "title": "Q3：走訪清單",
        "content": "Use a for loop to print each item in the list.",
        "task": "Loop through the list and print items.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Loop through the list and print items.\n",
        "answer": "items = [\"pen\", \"pencil\", \"eraser\"]\nfor x in items:\n    print(x)",
        "answerExplanation": "The for loop visits every item in the list sequence.",
        "keywords": [
          "for",
          "in",
          "print"
        ]
      },
      {
        "id": "q4_fruit_len",
        "title": "Q4：水果名稱與長度",
        "content": "Print each fruit name along with its length (number of letters).",
        "task": "Use len() inside the loop.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use len() inside the loop.\n",
        "answer": "fruits = [\"apple\", \"banana\", \"kiwi\"]\nfor fruit in fruits:\n    print(fruit, len(fruit))",
        "answerExplanation": "len() returns the number of characters in a string.",
        "keywords": [
          "for",
          "in",
          "len",
          "print"
        ]
      },
      {
        "id": "q5_modify",
        "title": "Q5：修改清單",
        "content": "Change specific items in a list using their index.",
        "task": "Change the second item (index 1) to 'orange'.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Change the second item (index 1) to 'orange'.\n",
        "answer": "fruits = [\"apple\", \"banana\", \"cherry\"]\nfruits[1] = \"orange\"\nprint(fruits)",
        "answerExplanation": "We can assign a new value to an existing index to overwrite it.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q6_sum_avg",
        "title": "Q6：清單總和與平均",
        "content": "Calculate sum and average of numerical logical lists.",
        "task": "Calculate sum and average of [10, 20, 30, 40].",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Calculate sum and average of [10, 20, 30, 40].\n",
        "answer": "nums = [10, 20, 30, 40]\ntotal = sum(nums)\navg = total / len(nums)\nprint(\"Sum:\", total)\nprint(\"Average:\", avg)",
        "answerExplanation": "sum() is a built-in function to add all items. len() gives count of items.",
        "keywords": [
          "print",
          "len"
        ]
      }
    ]
  },
  {
    "id": "5.3",
    "title": "5.3 更多清單操作",
    "subtopics": [
      {
        "id": "q1_append",
        "title": "Q1：append 加入元素",
        "content": "Add new items to the end of a list using append().",
        "task": "Add 'yellow' to the colors list.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Add 'yellow' to the colors list.\n",
        "answer": "colors = [\"red\", \"green\"]\ncolors.append(\"yellow\")\nprint(colors)",
        "answerExplanation": "append() adds the element to the end of the list.",
        "keywords": [
          "append",
          "print"
        ]
      },
      {
        "id": "q2_pop",
        "title": "Q2：用 pop() 移除",
        "content": "pop() removes an item at a specified index (default is last).",
        "task": "Remove the second item.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Remove the second item.\n",
        "answer": "items = [\"a\", \"b\", \"c\", \"d\"]\nitems.pop(1)\nprint(items)",
        "answerExplanation": "pop(1) removes item at index 1 ('b').",
        "keywords": [
          "pop",
          "print"
        ]
      },
      {
        "id": "q3_insert",
        "title": "Q3：插入元素",
        "content": "insert() adds an item at a specific index.",
        "task": "Insert 'orange' at the beginning (index 0).",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Insert 'orange' at the beginning (index 0).\n",
        "answer": "fruits = [\"apple\", \"banana\"]\nfruits.insert(0, \"orange\")\nprint(fruits)",
        "answerExplanation": "insert(0, ...) puts the new item at the start, shifting others right.",
        "keywords": [
          "insert",
          "print"
        ]
      },
      {
        "id": "q4_scrabble",
        "title": "Q4：拼字計分",
        "content": "Given a list of letters, remove the correct letters to form the word 'CAT'.",
        "task": "Remove 'Z', 'X', 'Y' from the list using remove() or pop().",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Remove 'Z', 'X', 'Y' from the list using remove() or pop().\n",
        "answer": "tiles = [\"C\", \"Z\", \"A\", \"X\", \"Y\", \"T\"]\ntiles.remove(\"Z\")\ntiles.remove(\"X\")\ntiles.remove(\"Y\")\nprint(tiles)",
        "answerExplanation": "remove() deletes the first occurrence of the value.",
        "keywords": [
          "remove",
          "print"
        ]
      }
    ]
  },
  {
    "id": "5.4",
    "title": "5.4 字典",
    "subtopics": [
      {
        "id": "intro_dict",
        "title": "字典簡介",
        "content": "A Dictionary is a collection which is ordered (from Python 3.7), changeable, and does not allow duplicates.\n\nDictionaries are written with curly brackets, and have keys and values.",
        "task": "Study the syntax of a dictionary.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Study the syntax of a dictionary.\n",
        "answer": "thisdict = {\n  \"brand\": \"Ford\",\n  \"model\": \"Mustang\",\n  \"year\": 1964\n}\nprint(thisdict)",
        "answerExplanation": "Dictionaries store data values in key:value pairs.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q1_create_dict",
        "title": "1. 建立字典",
        "content": "Create a dictionary named 'student' with keys: 'name', 'age', and 'grade'.",
        "task": "Create the dictionary and print it.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Create the dictionary and print it.\n",
        "answer": "student = {\n    \"name\": \"John\",\n    \"age\": 15,\n    \"grade\": \"10A\"\n}\nprint(student)",
        "answerExplanation": "Keys must be unique and immutable (usually strings). Values can be any data type.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q2_access_values",
        "title": "Q2：讀取字典的值",
        "content": "You can access the items of a dictionary by referring to its key name, inside square brackets.",
        "task": "Print the value of the 'model' key.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Print the value of the 'model' key.\n",
        "answer": "car = {\n  \"brand\": \"Ford\",\n  \"model\": \"Mustang\",\n  \"year\": 1964\n}\nprint(car[\"model\"])",
        "answerExplanation": "Using square brackets [\"key\"] is the most common way to access values.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q3_modify_dict",
        "title": "Q3：修改字典",
        "content": "You can change the value of a specific item by referring to its key name.\n\nYou can also add new items by assigning a value to a new key.",
        "task": "Change 'year' to 2020 and add a 'color' key set to 'red'.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Change 'year' to 2020 and add a 'color' key set to 'red'.\n",
        "answer": "car = {\n  \"brand\": \"Ford\",\n  \"model\": \"Mustang\",\n  \"year\": 1964\n}\ncar[\"year\"] = 2020\ncar[\"color\"] = \"red\"\nprint(car)",
        "answerExplanation": "If the key exists, the value is updated. If the key does not exist, a new key-value pair is added.",
        "keywords": [
          "print"
        ]
      },
      {
        "id": "q4_remove_dict",
        "title": "Q4：從字典刪除",
        "content": "The pop() method removes the item with the specified key name.",
        "task": "Remove the 'model' key from the dictionary.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Remove the 'model' key from the dictionary.\n",
        "answer": "car = {\n  \"brand\": \"Ford\",\n  \"model\": \"Mustang\",\n  \"year\": 1964\n}\ncar.pop(\"model\")\nprint(car)",
        "answerExplanation": "pop('key') removes the specific item. You can also use the 'del' keyword.",
        "keywords": [
          "pop",
          "print"
        ]
      },
      {
        "id": "q5_iterate_dict",
        "title": "Q5：走訪字典",
        "content": "You can loop through a dictionary.\n\n• For keys: for x in thisdict:\n• For values: for x in thisdict.values():\n• For both: for k, v in thisdict.items():",
        "task": "Print both keys and values.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Print both keys and values.\n",
        "answer": "student = {\"name\": \"John\", \"age\": 15, \"grade\": \"A\"}\nfor key, value in student.items():\n    print(key, \":\", value)",
        "answerExplanation": ".items() returns a view object that contains the key-value pairs of the dictionary.",
        "keywords": [
          "for",
          "in",
          "print"
        ]
      },
      {
        "id": "q6_get_method",
        "title": "Q6：使用 .get()",
        "content": "The get() method returns the value of the item with the specified key.\n\nIt is safer than brackets [] because it returns None (or a default value) if the key doesn't exist, instead of an error.",
        "task": "Try to get the value of 'price' using .get()",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Try to get the value of 'price' using .get()\n",
        "answer": "car = {\n  \"brand\": \"Ford\",\n  \"model\": \"Mustang\",\n  \"year\": 1964\n}\nx = car.get(\"price\", \"Not Found\")\nprint(x)",
        "answerExplanation": "Since 'price' is not in the dictionary, get() returns the second argument 'Not Found'.",
        "keywords": [
          "print"
        ]
      }
    ]
  },
  {
    "id": "6.1",
    "title": "6.1 定義函數",
    "subtopics": [
      {
        "id": "intro_func",
        "title": "函數簡介",
        "content": "Functions allow you to reuse code.\nSyntax:\ndef function_name():\n    # code",
        "task": "定義函數 called 'greet' that prints 'Hello!'.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：定義函數 called 'greet' that prints 'Hello!'.\n",
        "answer": "def greet():\n    print(\"Hello!\")\n\ngreet()",
        "answerExplanation": "We define the function using 'def'. The code inside must be indented. We execute it by calling greet().",
        "keywords": [
          "def",
          "print"
        ]
      },
      {
        "id": "q1_simple_func",
        "title": "Q1：沒有參數的函數",
        "content": "Create a function named 'say_hi' that prints 'Hi there!'.",
        "task": "Define and call the function.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Define and call the function.\n",
        "answer": "def say_hi():\n    print(\"Hi there!\")\n\nsay_hi()",
        "answerExplanation": "Simple functions encapsulates code for reuse without needing input.",
        "keywords": [
          "def",
          "print"
        ]
      },
      {
        "id": "q2_func_params",
        "title": "Q2：有參數的函數",
        "content": "Information can be passed into functions as arguments.",
        "task": "Create a function 'greet(name)' that prints 'Hello, ' + name.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Create a function 'greet(name)' that prints 'Hello, ' + name.\n",
        "answer": "def greet(name):\n    print(\"Hello, \" + name + \"!\")\n\ngreet(\"Alice\")\ngreet(\"Bob\")",
        "answerExplanation": "The variable 'name' in the parentheses is a parameter. When we call greet(\"Alice\"), \"Alice\" is passed into 'name'.",
        "keywords": [
          "def",
          "print"
        ]
      },
      {
        "id": "q3_func_return",
        "title": "Q3：有傳回值的函數",
        "content": "To let a function return a value, use the RETURN statement.",
        "task": "Create a function that returns 5 times the input value.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Create a function that returns 5 times the input value.\n",
        "answer": "def times_five(x):\n  return 5 * x\n\nprint(times_five(3))\nprint(times_five(5))",
        "answerExplanation": "When Python reaches a return statement, the function ends and sends the value back to the caller.",
        "keywords": [
          "def",
          "return",
          "print"
        ]
      },
      {
        "id": "q4_func_multi_params",
        "title": "Q4：多個參數",
        "content": "You can send as many arguments as you like, separated by commas.",
        "task": "Create a function 'add(a, b)' that returns the sum of a and b.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Create a function 'add(a, b)' that returns the sum of a and b.\n",
        "answer": "def add(a, b):\n    return a + b\n\nresult = add(5, 3)\nprint(\"The sum is:\", result)",
        "answerExplanation": "The function expects 2 arguments, and creates 2 variables a and b inside the function.",
        "keywords": [
          "def",
          "return",
          "print"
        ]
      },
      {
        "id": "q5_func_max",
        "title": "Q5：找出最大值",
        "content": "Comparison logic can be wrapped inside a function.",
        "task": "Create a function 'find_max(a, b)' that returns the larger number.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Create a function 'find_max(a, b)' that returns the larger number.\n",
        "answer": "def find_max(a, b):\n    if a > b:\n        return a\n    else:\n        return b\n\nprint(\"Max is:\", find_max(10, 20))",
        "answerExplanation": "Using if-else inside function to determine return value.",
        "keywords": [
          "def",
          "return",
          "if",
          "else",
          "print"
        ]
      },
      {
        "id": "q6_func_prime",
        "title": "Q6：判斷質數",
        "content": "Wrap your prime number checker logic into a reusable function.",
        "task": "Create 'is_prime(n)' that returns True or False.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Create 'is_prime(n)' that returns True or False.\n",
        "answer": "def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, n):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(17))\nprint(is_prime(4))",
        "answerExplanation": "Functions allow complex logic (like prime checking) to be reused easily throughout your code.",
        "keywords": [
          "def",
          "if",
          "return",
          "for",
          "in",
          "range",
          "print"
        ]
      }
    ]
  },
  {
    "id": "6.2",
    "title": "6.2 函數練習",
    "subtopics": [
      {
        "id": "assign_q1_even_odd",
        "title": "Q1：函數判斷奇偶",
        "content": "Write a function 'check_even(num)' that returns 'Even' if the number is even, and 'Odd' if it is odd.",
        "task": "Implement the function.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Implement the function.\n",
        "answer": "def check_even(num):\n    if num % 2 == 0:\n        return \"Even\"\n    else:\n        return \"Odd\"\n\nprint(check_even(4))\nprint(check_even(7))",
        "answerExplanation": "Modulo operator % is used to check remainder.",
        "keywords": [
          "def",
          "if",
          "else",
          "return",
          "print"
        ]
      },
      {
        "id": "assign_q2_table",
        "title": "Q2：函數與乘法表",
        "content": "Write a function 'print_table(n)' that prints the multiplication table for number n from 1 to 10.",
        "task": "Use a loop inside the function.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use a loop inside the function.\n",
        "answer": "def print_table(n):\n    for i in range(1, 11):\n        print(n, \"x\", i, \"=\", n * i)\n\nprint_table(5)",
        "answerExplanation": "Functions can contain loops.",
        "keywords": [
          "def",
          "for",
          "in",
          "range",
          "print"
        ]
      },
      {
        "id": "assign_q3_reverse",
        "title": "Q3：函數反轉字串",
        "content": "Write a function 'reverse_string(text)' that returns the reverse of the input string.",
        "task": "Use string slicing.",
        "initialCode": "# 練習起點：請自己完成，這不是完整答案。\n# 任務：Use string slicing.\n",
        "answer": "def reverse_string(text):\n    return text[::-1]\n\nprint(reverse_string(\"Python\"))",
        "answerExplanation": "String slicing [::-1] creates a reversed copy.",
        "keywords": [
          "def",
          "return",
          "print"
        ]
      }
    ]
  }
];
