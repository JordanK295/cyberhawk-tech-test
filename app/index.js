const express = require('express');
const farms = require('./SampleData/farms.json');
const turbines = require('./SampleData/turbines.json');
const components = require('./SampleData/components.json');
const inspections = require('./SampleData/inspections.json');
const grades = require('./SampleData/grades.json');

const app = express();
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const componentTypes = [
  { id: 1, name: 'Component Type 1', created_at: '2024-01-27T13:10:00Z', updated_at: '2024-01-27T13:15:00Z' },
  // Add more component types as needed
];

const gradeTypes = [
  { id: 1, name: 'Grade Type 1', created_at: '2024-01-27T13:20:00Z', updated_at: '2024-01-27T13:25:00Z' },
  // Add more grade types as needed
];

// Farms
// Function to get farm details by ID

function daysAgo(dateTimeString) {
  const currentDateTime = new Date();
  const pastDateTime = new Date(dateTimeString);

  const timeDifference = currentDateTime - pastDateTime;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return `${daysDifference} days`;
}

function calculateAverageGrade(turbines, inspections, grades) {
  let totalGrade = 0;
  let totalGradesCount = 0;

  turbines.forEach((turbine) => {
    const turbineInspections = inspections.filter((i) => i.turbine_id === turbine.id);

    turbineInspections.forEach((inspection) => {
      const turbineGrades = grades.filter((g) => g.inspection_id === inspection.id);
      turbineGrades.forEach((grade) => {
        totalGrade += grade.grade_type_id;
        totalGradesCount += 1;
      });
    });
  });

  function roundToOneDecimalPlace(number) {
    return parseFloat(number.toFixed(1));
  }

  return totalGradesCount > 0 ? roundToOneDecimalPlace(totalGrade / totalGradesCount) : null;
}

function getFarmDetails(farmID) {
  const farm = farms.find((f) => f.id === farmID);

  if (!farm) {
    return null;
  }

  const farmTurbines = turbines.filter((t) => t.farm_id === farmID);
  const numberOfTurbines = farmTurbines.length;

  let leastRecentInspectionTime = null;
  farmTurbines.forEach((turbine) => {
    const turbineInspections = inspections.filter((i) => i.turbine_id === turbine.id);
    turbineInspections.forEach((inspection) => {
      if (!leastRecentInspectionTime || new Date(inspection.inspected_at) < new Date(leastRecentInspectionTime)) {
        leastRecentInspectionTime = inspection.inspected_at;
      }
    });
  });

  const averageGrade = calculateAverageGrade(farmTurbines, inspections, grades);

  const leastRecentInspectionDaysAgo = daysAgo(leastRecentInspectionTime);

  return {
    id: farm.id,
    name: farm.name,
    numberOfTurbines,
    leastRecentInspectionDaysAgo,
    averageGrade,
  };
}

// Endpoint to get farm details by ID
app.get('/api/farms/:farmID', (req, res) => {
  const farmID = parseInt(req.params.farmID, 10);
  const farmDetails = getFarmDetails(farmID);

  if (!farmDetails) {
    return res.status(404).json({ error: 'Farm not found' });
  }

  res.json(farmDetails);
});

// Endpoint to get details for all farms
app.get('/api/farms', (req, res) => {
  const farmsDetails = farms.map((farm) => getFarmDetails(farm.id));
  res.json(farmsDetails);
});

// Turbines
app.get('/api/farms/:farmID/turbines', (req, res) => {
  const farmID = parseInt(req.params.farmID);
  const farmTurbines = turbines.filter((turbine) => turbine.farm_id === farmID);

  res.json({ data: farmTurbines });
});

app.get('/api/farms/:farmID/turbines/:turbineID', (req, res) => {
  const farmID = parseInt(req.params.farmID);
  const turbineID = parseInt(req.params.turbineID);
  const turbine = turbines.find((turbine) => turbine.id === turbineID && turbine.farm_id === farmID);

  if (turbine) {
    res.json(turbine);
  } else {
    res.status(404).json({ code: 404, message: 'Turbine not found' });
  }
});

// Components
app.get('/api/turbines/:turbineID/components', (req, res) => {
  const turbineID = parseInt(req.params.turbineID);
  const turbineComponents = components.filter((component) => component.turbine_id === turbineID);

  res.json({ data: turbineComponents });
});

app.get('/api/turbines/:turbineID/components/:componentID', (req, res) => {
  const turbineID = parseInt(req.params.turbineID);
  const componentID = parseInt(req.params.componentID);
  const component = components.find((component) => component.id === componentID && component.turbine_id === turbineID);

  if (component) {
    res.json(component);
  } else {
    res.status(404).json({ code: 404, message: 'Component not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
