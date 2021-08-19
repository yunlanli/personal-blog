import fs from 'fs';
import path from 'path';


const projectJsonDirectory = path.join(process.cwd(),'projects');

export function getSortedProjects() {
    // find all projects and store in any array
    const fileNames = fs.readdirSync(projectJsonDirectory);
    const allProjectsData = fileNames.map(fileName => {
        // Read each project's json file
        const fullPath = path.join(projectJsonDirectory, fileName);
        return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    });

    // sort the array based on project start date
    allProjectsData.sort( (a,b) => {
        return a.time.start < b.time.start ? 1 : -1;
    });

    return allProjectsData
}

