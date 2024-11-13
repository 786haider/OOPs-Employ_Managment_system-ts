import inquirer from "inquirer";
import chalk from "chalk";

abstract class Employee {
  constructor(public id: number, public name: string, public salary: number) {}

  abstract getRole(): string;

  displayDetails(): void {
    console.log(
      chalk.greenBright(`ID: ${this.id},`) +
        chalk.cyanBright(` Name: ${this.name},`) +
        chalk.yellowBright(` Role: ${this.getRole()},`) +
        chalk.magentaBright(` Salary: ${this.salary}`)
    );
  }
}

class Manager extends Employee {
  constructor(
    id: number,
    name: string,
    salary: number,
    public department: string
  ) {
    super(id, name, salary);
  }

  getRole(): string {
    return "Manager";
  }
}

class Developer extends Employee {
  constructor(
    id: number,
    name: string,
    salary: number,
    public programmingLanguage: string
  ) {
    super(id, name, salary);
  }

  getRole(): string {
    return "Developer";
  }
}

class Designer extends Employee {
  constructor(id: number, name: string, salary: number, public tool: string) {
    super(id, name, salary);
  }

  getRole(): string {
    return "Designer";
  }
}

class SEO extends Employee {
  constructor(id: number, name: string, salary: number, public tool: string) {
    super(id, name, salary);
  }

  getRole(): string {
    return "SEO";
  }
}
class Freelancer extends Employee {
  constructor(id: number, name: string, salary: number, public tool: string) {
    super(id, name, salary);
  }

  getRole(): string {
    return "Freelancer";
  }
}

class EmployeeManagementSystem {
  private employees: Employee[] = [];

  addEmployee(employee: Employee): void {
    this.employees.push(employee);
    console.log(
      chalk.bold.greenBright(
        `\nEmployee ${employee.name} added successfully!\n`
      )
    );
  }

  removeEmployee(id: number): void {
    const initialLength = this.employees.length;
    this.employees = this.employees.filter((employee) => employee.id !== id);
    if (this.employees.length < initialLength) {
      console.log(
        chalk.bold.redBright(`\nEmployee with ID ${id} removed successfully!\n`)
      );
    } else {
      console.log(chalk.bold.red(`\nEmployee with ID ${id} not found.\n`));
    }
  }

  displayAllEmployees(): void {
    if (this.employees.length === 0) {
      console.log(chalk.bold.redBright("\nNo employees found!\n"));
    } else {
      console.log(chalk.bold.blueBright("\nEmployee Records:"));
      this.employees.forEach((employee) => employee.displayDetails());
      console.log("\n");
    }
  }
}

const system = new EmployeeManagementSystem();

async function mainMenu() {
  const choices = [
    chalk.blue("Add Employee"),
    chalk.green("View All Employees"),
    chalk.red("Remove Employee"),
    chalk.yellow("Exit"),
  ];

  const { action } = await inquirer.prompt({
    name: "action",
    type: "list",
    message: chalk.bold("Choose an action:"),
    choices,
  });

  switch (action) {
    case chalk.blue("Add Employee"):
      await addEmployeePrompt();
      break;

    case chalk.green("View All Employees"):
      system.displayAllEmployees();
      break;

    case chalk.red("Remove Employee"):
      await removeEmployeePrompt();
      break;

    case chalk.yellow("Exit"):
      console.log(
        chalk.bold.magentaBright("Exiting Employee Management System.")
      );
      process.exit();
  }

  mainMenu();
}

async function addEmployeePrompt() {
  const { role } = await inquirer.prompt({
    name: "role",
    type: "list",
    message: chalk.bold("Select the role of the employee:"),
    choices: [
      chalk.cyan("Manager"),
      chalk.cyan("Developer"),
      chalk.cyan("Designer"),
      chalk.cyan("SEO"),
      chalk.cyan("Freelancer"),
    ],
  });

  const { id, name, salary } = await inquirer.prompt([
    {
      name: "id",
      type: "number",
      message: chalk.bold("Enter Employee ID:"),
    },
    {
      name: "name",
      type: "input",
      message: chalk.bold("Enter Employee Name:"),
    },
    {
      name: "salary",
      type: "number",
      message: chalk.bold("Enter Employee Salary:"),
    },
  ]);

  let specificData;
  if (role === chalk.cyan("Manager")) {
    specificData = await inquirer.prompt({
      name: "department",
      type: "input",
      message: chalk.bold("Enter Manager's Department:"),
    });
    system.addEmployee(new Manager(id, name, salary, specificData.department));
  } else if (role === chalk.cyan("Developer")) {
    specificData = await inquirer.prompt({
      name: "programmingLanguage",
      type: "input",
      message: chalk.bold("Enter Developer's Programming Language:"),
    });
    system.addEmployee(
      new Developer(id, name, salary, specificData.programmingLanguage)
    );
  } else if (role === chalk.cyan("Designer")) {
    specificData = await inquirer.prompt({
      name: "tool",
      type: "input",
      message: chalk.bold("Enter Designer's Tool:"),
    });
    system.addEmployee(new Designer(id, name, salary, specificData.tool));
  } else if (role === chalk.cyan("SEO")) {
    specificData = await inquirer.prompt({
      name: "tool",
      type: "input",
      message: chalk.bold("Enter SEO Tool:"),
    });
    system.addEmployee(new SEO(id, name, salary, specificData.tool));
  } else if (role === chalk.cyan("Freelancer")) {
    specificData = await inquirer.prompt({
      name: "tool",
      type: "input",
      message: chalk.bold("Enter Freelancing Sites:"),
    });
    system.addEmployee(new Freelancer(id, name, salary, specificData.tool));
  }
}

// Prompt to remove an employee
async function removeEmployeePrompt() {
  const { id } = await inquirer.prompt({
    name: "id",
    type: "number",
    message: chalk.bold("Enter the ID of the employee to remove:"),
  });

  system.removeEmployee(id);
}

mainMenu();
