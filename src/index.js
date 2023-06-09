#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get the command-line arguments (excluding the script file path)
const args = process.argv.slice(2);
const componentNames = args.filter((arg) => !arg.startsWith("-"));
const hasFolderOption = args.includes("-f");

// Check if component names are provided
if (componentNames.length === 0) {
  console.error("Please provide at least one component name!");
  process.exit(1);
}

// Convert the component names to kebab-case
const kebabCaseNames = componentNames.map((componentName) =>
  componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
);

// Create the component template code
const generateComponentCode = (componentName) => `
import React from 'react';

type ${componentName}Props = {
  // props type declaration
};

export function ${componentName}(props: ${componentName}Props) {
  return (
    <div data-testid="${kebabCaseNames[componentNames.indexOf(componentName)]}">
      {/* Component content */}
    </div>
  );
}
`;

// Get the current folder path
const currentPath = process.cwd();

componentNames.forEach((componentName) => {
  // If the -f option is provided, create a component folder
  if (hasFolderOption) {
    const folderPath = path.join(currentPath, componentName);

    // Check if the folder already exists
    if (fs.existsSync(folderPath)) {
      console.error(`Folder "${componentName}" already exists!`);
      return;
    }

    fs.mkdirSync(folderPath);

    // Generate the component file and test file
    fs.writeFileSync(
      path.join(folderPath, "index.tsx"),
      generateComponentCode(componentName)
    );
    fs.writeFileSync(
      path.join(folderPath, `${componentName}.test.tsx`),
      `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${componentName} from './index';

test('${componentName} renders correctly', () => {
  render(<${componentName} />);
  const component = screen.getByTestId('${
    kebabCaseNames[componentNames.indexOf(componentName)]
  }');

  // Test code
});
`
    );

    console.log(
      `Generated component "${componentName}" with the corresponding folder and files.`
    );
  } else {
    // Generate the component file
    fs.writeFileSync(
      `${componentName}.tsx`,
      generateComponentCode(componentName)
    );

    // Generate the test file
    fs.writeFileSync(
      `${componentName}.test.tsx`,
      `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${componentName} from './${componentName}';

test('${componentName} renders correctly', () => {
  render(<${componentName} />);
  const component = screen.getByTestId('${
    kebabCaseNames[componentNames.indexOf(componentName)]
  }');

  // Test code
});
`
    );

    console.log(
      `Generated component "${componentName}" and the corresponding test file.`
    );
  }
});
