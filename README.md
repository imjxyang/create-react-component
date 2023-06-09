# Create React Component

This is a command-line tool for generating React components with corresponding test files.

## Installation

To use `create-react-component`, you can install it globally via npm:

`npm install -g create-react-component`

## Usage

Run the following command to generate a React component:

`create-react-component [componentName]`


To generate a component with a folder and additional files, use the `-f` option:

`create-react-component [componentName] -f`


Multiple component names can be provided to generate multiple components at once:

`create-react-component [componentName1] [componentName2] ...`


## Generated Files

When generating a component without the `-f` option, the following files will be created:

- `ComponentName.tsx`: The React component file.
- `ComponentName.test.tsx`: The test file for the component.

When generating a component with the `-f` option, a folder named `ComponentName` will be created with the following files:

- `index.tsx`: The React component file.
- `ComponentName.test.tsx`: The test file for the component.

## Customization

You can customize the generated component by modifying the generated files according to your needs.


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).





