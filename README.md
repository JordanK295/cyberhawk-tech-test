# Cyberhawk tech test

This is a technical test originating from here: https://github.com/cyberhawk-software/technical-test-front-end

A short video demonstration is available here: https://streamable.com/4oi30w

## Running the project locally

Node 20 should be installed on your machine globally.

Install the project dependencies:

`npm i` 

Run a local development server:

`npm run dev`

This will concurrently run `npm run start` (frontend) and `node app/.` (backend).

You should be able to access the project at http://localhost:3000/.

Backend will be running on port http://localhost:8080/

## Notes

The original repo had issues with docker on my machine. I instead built it from scratch but with a node backend, however I'm not a backend dev so please forgive any hiccups.

### Core concepts demonstrated

- React
- Tailwind
- Typescript and JavaScript
- Testing
- Mapping
- ESLint and Prettier
- UI and branding
- Github and conventional commits
- Utilising third party packages where appropriate

### My thoughts

I'm overall happy with the way this turned out and isn't dissimilar from what I had sketched on paper at the start. I aimed to build something that would would actually work as a scalable and useable application, favouring simplicity over bells and whistles. If tomorrow I wanted to deploy this I could do so and it would serve a purpose, which I can't say the same for other tech tests I've done in the past.

It took considerably longer than I thought but a lot of that was trying to get the original repo working on my machine. I'm using WSL2 so that is probably something to do with it.

###  Things for the future

If I continued this in the future I would add the following:

- Sortable and customizable table columns
- Tables downloadable as .csv
- Login and api authentication
- Editable data
- Turbine and component models
- Responsive UI
- E2E testing
