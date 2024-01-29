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

function daysAgo(dateTimeString) {
  const currentDateTime = new Date();
  const pastDateTime = new Date(dateTimeString);

  const timeDifference = currentDateTime - pastDateTime;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const text = daysDifference === 1 ? 'day ago' : `days ago`;

  return `${daysDifference} ${text}`;
}

function roundToOneDecimalPlace(number) {
  return parseFloat(number.toFixed(1));
}

function calculateAverageFarmGrade(turbines, inspections, grades) {
  let totalGrade = 0;
  let totalGradesCount = 0;

  turbines.forEach((turbine) => {
    const turbineInspections = inspections.filter((i) => i.turbine_id === turbine.id);

    turbineInspections.forEach((inspection) => {
      const turbineGrades = grades.filter((g) => g.inspection_id === inspection.id);
      turbineGrades.forEach((grade) => {
        totalGrade += grade.grade;
        totalGradesCount += 1;
      });
    });
  });

  return totalGradesCount > 0 ? roundToOneDecimalPlace(totalGrade / totalGradesCount) : null;
}

function calculateAverageTurbineGrade(turbineID, inspections, grades) {
  const turbineInspections = inspections.filter((i) => i.turbine_id === turbineID);
  let totalGrade = 0;
  let totalGradesCount = 0;

  turbineInspections.forEach((inspection) => {
    const turbineGrades = grades.filter((g) => g.inspection_id === inspection.id);
    turbineGrades.forEach((grade) => {
      totalGrade += grade.grade;
      totalGradesCount += 1;
    });
  });

  return totalGradesCount > 0 ? roundToOneDecimalPlace(totalGrade / totalGradesCount) : null;
}

function getFarmDetails(farmID) {
  const farm = farms.find((f) => f.id === farmID);

  if (!farm) {
    return null;
  }

  const farmTurbines = turbines.filter((t) => t.farm_id === farmID);
  const numberOfTurbines = farmTurbines.length;

  const mostRecentInspections = [];

  farmTurbines.forEach((turbine) => {
    const turbineInspections = inspections.filter((i) => i.turbine_id === turbine.id);

    if (turbineInspections.length > 0) {
      // Sort turbine inspections in descending order based on the 'inspected_at' timestamp
      turbineInspections.sort((a, b) => new Date(b.inspected_at) - new Date(a.inspected_at));

      // Take the most recent inspection for the turbine
      mostRecentInspections.push(turbineInspections[0]);
    }
  });

  // Sort all most recent inspections in ascending order based on the 'inspected_at' timestamp
  mostRecentInspections.sort((a, b) => new Date(a.inspected_at) - new Date(b.inspected_at));

  const oldestInspectionTime = mostRecentInspections.length > 0 ? mostRecentInspections[0].inspected_at : null;

  const averageGrade = calculateAverageFarmGrade(farmTurbines, inspections, grades);

  const oldestInspection = oldestInspectionTime ? daysAgo(oldestInspectionTime) : null;

  return {
    id: farm.id,
    name: farm.name,
    numberOfTurbines,
    oldestInspection,
    averageGrade,
  };
}

const getTurbinesDetails = (farmId) => {
  // Find the turbines associated with the farm
  const farmTurbines = turbines.filter((t) => t.farm_id === farmId);

  return farmTurbines.map((turbine) => {
    function getMostRecentInspection(inspections, turbineID) {
      const turbineInspections = inspections.filter((inspection) => inspection.turbine_id === turbineID);

      if (turbineInspections.length === 0) {
        return null; // No inspections found for the given turbine
      }

      // Sort inspections in descending order based on the 'inspected_at' timestamp
      const sortedInspections = turbineInspections.sort((a, b) => new Date(b.inspected_at) - new Date(a.inspected_at));

      return sortedInspections[0];
    }

    // Find the most recent inspection for the given turbine
    const mostRecentInspection = daysAgo(getMostRecentInspection(inspections, turbine.id).inspected_at);

    // Calculate the average grade for all components in the turbine
    const averageGrade = calculateAverageTurbineGrade(turbine.id, inspections, grades);

    // Find the number of components for the turbine
    const numberOfComponents = components.filter((g) => g.turbine_id === turbine.id).length;

    return {
      id: turbine.id,
      name: turbine.name,
      farmId: turbine.farm_id,
      lat: turbine.lat,
      lng: turbine.lng,
      createdAt: turbine.created_at,
      updatedAt: turbine.updated_at,
      mostRecentInspection,
      averageGrade,
      numberOfComponents,
    };
  });
};

function getMostRecentInspection(inspections, turbineID) {
  const turbineInspections = inspections.filter((i) => i.turbine_id === turbineID);

  if (turbineInspections.length === 0) {
    return null;
  }

  // Sort inspections in descending order based on the 'inspected_at' timestamp
  const sortedInspections = turbineInspections.sort((a, b) => new Date(b.inspected_at) - new Date(a.inspected_at));

  return sortedInspections[0];
}

// Endpoint to get details for all farms
app.get('/api/farms', (req, res) => {
  const farmsDetails = farms.map((farm) => getFarmDetails(farm.id));
  res.json(farmsDetails);
});

// Endpoint to get farm details by ID
app.get('/api/farms/:farmID', (req, res) => {
  const farmID = parseInt(req.params.farmID, 10);
  const farmDetails = getFarmDetails(farmID);

  if (!farmDetails) {
    return res.status(404).json({ error: 'Farm not found' });
  }

  return res.json(farmDetails);
});

app.get('/api/farms/:farmID/turbines', (req, res) => {
  const farmID = parseInt(req.params.farmID, 10);

  res.json(getTurbinesDetails(farmID));
});

// Endpoint to get components for a specific turbine
app.get('/api/turbines/:turbineID/components', (req, res) => {
  const turbineID = parseInt(req.params.turbineID, 10);

  // Find the components associated with the turbine
  const turbineComponents = components.filter((c) => c.turbine_id === turbineID);

  if (turbineComponents.length === 0) {
    return res.json([]); // Return an empty array if no components found for the turbine
  }

  // Find the most recent inspection for the turbine
  const mostRecentInspection = daysAgo(getMostRecentInspection(inspections, turbineID).inspected_at);

  // Find the most recent grade associated with each component
  const mostRecentGrades = turbineComponents.map((component) => {
    const componentGrades = grades.filter((grade) => grade.component_id === component.id);

    if (componentGrades.length > 0) {
      // Sort grades in descending order based on the 'created_at' timestamp
      componentGrades.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // Take the most recent grade for the component
      return componentGrades[0].grade;
    }

    return null; // Return null if no grades found for the component
  });

  const response = {
    turbineId: turbineID,
    components: turbineComponents.map((component, index) => ({
      id: component.id,
      componentTypeId: component.component_type_id,
      turbineId: component.turbine_id,
      lastInspection: mostRecentInspection,
      grade: mostRecentGrades[index],
    })),
  };

  return res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
