import inquirer from 'inquirer';
import chalk from 'chalk';
class Employee {
    id;
    name;
    salary;
    constructor(id, name, salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
    displayDetails() {
        console.log(chalk.greenBright(`ID: ${this.id},`) +
            chalk.cyanBright(` Name: ${this.name},`) +
            chalk.yellowBright(` Role: ${this.getRole()},`) +
            chalk.magentaBright(` Salary: ${this.salary}`));
    }
}
class Manager extends Employee {
    department;
    constructor(id, name, salary, department) {
        super(id, name, salary);
        this.department = department;
    }
    getRole() {
        return "Manager";
    }
}
class Developer extends Employee {
    programmingLanguage;
    constructor(id, name, salary, programmingLanguage) {
        super(id, name, salary);
        this.programmingLanguage = programmingLanguage;
    }
    getRole() {
        return "Developer";
    }
}
class Designer extends Employee {
    tool;
    constructor(id, name, salary, tool) {
        super(id, name, salary);
        this.tool = tool;
    }
    getRole() {
        return "Designer";
    }
}
class SEO extends Employee {
    tool;
    constructor(id, name, salary, tool) {
        super(id, name, salary);
        this.tool = tool;
    }
    getRole() {
        return "SEO";
    }
}
class Freelancer extends Employee {
    tool;
    constructor(id, name, salary, tool) {
        super(id, name, salary);
        this.tool = tool;
    }
    getRole() {
        return "Freelancer";
    }
}
// Employee Management System Class
class EmployeeManagementSystem {
    employees = [];
    addEmployee(employee) {
        this.employees.push(employee);
        console.log(chalk.bold.greenBright(`\nEmployee ${employee.name} added successfully!\n`));
    }
    removeEmployee(id) {
        const initialLength = this.employees.length;
        this.employees = this.employees.filter(employee => employee.id !== id);
        if (this.employees.length < initialLength) {
            console.log(chalk.bold.redBright(`\nEmployee with ID ${id} removed successfully!\n`));
        }
        else {
            console.log(chalk.bold.red(`\nEmployee with ID ${id} not found.\n`));
        }
    }
    displayAllEmployees() {
        if (this.employees.length === 0) {
            console.log(chalk.bold.redBright("\nNo employees found!\n"));
        }
        else {
            console.log(chalk.bold.blueBright("\nEmployee Records:"));
            this.employees.forEach(employee => employee.displayDetails());
            console.log("\n");
        }
    }
}
// Initialize system
const system = new EmployeeManagementSystem();
// Main function to interact with the user
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
            console.log(chalk.bold.magentaBright("Exiting Employee Management System."));
            process.exit();
    }
    mainMenu(); // Loop back to the main menu
}
// Prompt to add an employee
async function addEmployeePrompt() {
    const { role } = await inquirer.prompt({
        name: "role",
        type: "list",
        message: chalk.bold("Select the role of the employee:"),
        choices: [chalk.cyan("Manager"), chalk.cyan("Developer"), chalk.cyan("Designer"), chalk.cyan("SEO"), chalk.cyan("Freelancer")],
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
    }
    else if (role === chalk.cyan("Developer")) {
        specificData = await inquirer.prompt({
            name: "programmingLanguage",
            type: "input",
            message: chalk.bold("Enter Developer's Programming Language:"),
        });
        system.addEmployee(new Developer(id, name, salary, specificData.programmingLanguage));
    }
    else if (role === chalk.cyan("Designer")) {
        specificData = await inquirer.prompt({
            name: "tool",
            type: "input",
            message: chalk.bold("Enter Designer's Tool:"),
        });
        system.addEmployee(new Designer(id, name, salary, specificData.tool));
    }
    else if (role === chalk.cyan("SEO")) {
        specificData = await inquirer.prompt({
            name: "tool",
            type: "input",
            message: chalk.bold("Enter SEO Tool:"),
        });
        system.addEmployee(new SEO(id, name, salary, specificData.tool));
    }
    else if (role === chalk.cyan("Freelancer")) {
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
// Start the application
mainMenu();
