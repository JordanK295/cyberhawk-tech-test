const express = require('express');

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

// Sample data
const farms = [
  { id: 1, name: 'Green Meadows Farm', created_at: '2024-01-27T12:00:00Z', updated_at: '2024-01-27T12:30:00Z' },
  { id: 2, name: 'Sunrise Orchards', created_at: '2024-01-27T12:05:00Z', updated_at: '2024-01-27T12:35:00Z' },
  { id: 3, name: 'Golden Fields Ranch', created_at: '2024-01-27T12:10:00Z', updated_at: '2024-01-27T12:40:00Z' },
  { id: 4, name: 'The Old Brook', created_at: '2024-01-27T12:15:00Z', updated_at: '2024-01-27T12:45:00Z' },
  { id: 5, name: 'Harmony Haven Farmstead', created_at: '2024-01-27T12:20:00Z', updated_at: '2024-01-27T12:50:00Z' },
  { id: 6, name: 'Smith Vineyards', created_at: '2024-01-27T12:25:00Z', updated_at: '2024-01-27T12:55:00Z' },
  { id: 7, name: 'Ada Ranch', created_at: '2024-01-27T12:30:00Z', updated_at: '2024-01-27T13:00:00Z' },
  { id: 8, name: 'Black Forest Farms', created_at: '2024-01-27T12:35:00Z', updated_at: '2024-01-27T13:05:00Z' },
  { id: 9, name: 'Ocean Breeze Homestead', created_at: '2024-01-27T12:40:00Z', updated_at: '2024-01-27T13:10:00Z' },
  { id: 10, name: 'Royal Estate', created_at: '2024-01-27T12:45:00Z', updated_at: '2024-01-27T13:15:00Z' },
  { id: 11, name: 'Baker Farm', created_at: '2024-01-27T12:50:00Z', updated_at: '2024-01-27T13:20:00Z' },
  { id: 12, name: 'Connoly Lane', created_at: '2024-01-27T12:55:00Z', updated_at: '2024-01-27T13:25:00Z' },
  { id: 13, name: 'Egan Lake', created_at: '2024-01-27T13:00:00Z', updated_at: '2024-01-27T13:30:00Z' },
  { id: 14, name: 'Dreary Farm', created_at: '2024-01-27T13:05:00Z', updated_at: '2024-01-27T13:35:00Z' },
  { id: 15, name: 'Carlton Estate', created_at: '2024-01-27T13:10:00Z', updated_at: '2024-01-27T13:40:00Z' },
];

const turbines = [
  {
    id: 1,
    name: 'Turbine 1',
    farm_id: 1,
    lat: 123.456,
    lng: 789.012,
    created_at: '2024-01-27T12:15:00Z',
    updated_at: '2024-01-27T12:45:00Z',
  },
  // Add more turbines as needed
];

const components = [
  {
    id: 1,
    component_type_id: 1,
    turbine_id: 1,
    created_at: '2024-01-27T12:20:00Z',
    updated_at: '2024-01-27T12:50:00Z',
  },
  // Add more components as needed
];

const inspections = [
  {
    id: 1,
    turbine_id: 1,
    inspected_at: '2024-01-27T12:25:00Z',
    created_at: '2024-01-27T12:55:00Z',
    updated_at: '2024-01-27T13:00:00Z',
  },
  // Add more inspections as needed
];

const grades = [
  {
    id: 1,
    inspection_id: 1,
    component_id: 1,
    grade_type_id: 1,
    created_at: '2024-01-27T12:35:00Z',
    updated_at: '2024-01-27T13:05:00Z',
  },
  // Add more grades as needed
];

const componentTypes = [
  { id: 1, name: 'Component Type 1', created_at: '2024-01-27T13:10:00Z', updated_at: '2024-01-27T13:15:00Z' },
  // Add more component types as needed
];

const gradeTypes = [
  { id: 1, name: 'Grade Type 1', created_at: '2024-01-27T13:20:00Z', updated_at: '2024-01-27T13:25:00Z' },
  // Add more grade types as needed
];

// Define routes

// Farms
app.get('/api/farms', (req, res) => {
  res.json({ data: farms });
});

app.get('/api/farms/:farmID', (req, res) => {
  const farmID = parseInt(req.params.farmID);
  const farm = farms.find((farm) => farm.id === farmID);

  if (farm) {
    res.json(farm);
  } else {
    res.status(404).json({ code: 404, message: 'Farm not found' });
  }
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

// ... Add more routes as needed ...

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
