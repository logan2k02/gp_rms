# GP RMS

# Set up

1. Enable(or install if it's not there) WSL(Windows Sub System for Linux). Tutorials are there in YouTube.
2. Install Docker Desktop in your pc, just google it, download the setup and install
3. Install Node.js in your pc(if it's not there)
4. Install Angular CLI and Nest JS CLI. Google for more info.
5. Open `gp_rms_vscode_ws.code-workspace` via VS Code.(just double click on it). This is the workspace definition for VS Code.
6. There are 3 folders: backend, frontend and root.
7. Backend is the Nest JS project, frontend is the Angular project. Root contains the `docker-compose.yml`. We use docker only for the database services: postgreSQL database and pgAdmin4(a phpmyadmin like tool for postgreSQL).
8. Open a terminal in `root` and run `docker-compose up -d` as a command.(Terminal profile: **Git Bash** is preferred) This commands starts the mentioned database services. You can check if the services are running via the Docker Desktop app in your pc.
9. Visit `http://localhost:5050`, this is the pgAdmin4 web interface. Sign-in credentials -> `Email: dbadmin@gprms.com, PW: 123456`.
10. Visit to `frontend` and `backend` folders and run `npm install` in each to install dependancies.
11. Open terminal in `frontend` folder and run `ng serve`. This starts the Angular development server. Which probably is available at http://localhost:4200.
12. Open another terminal in `backend` folder and run `npm run start:dev`. This will spin up Nest JS development server. It's available at http://localhost:3000(No reason to visit this via browser since it's a backend dev server, just given as a detail)
13. Since we use Prisma as our ORM tool, it provides us a web interface(Prisma Studio) to work with the database. To run it, open a terminal inside `backend` folder and run `npx prisma studio`.
14. Setup is done.

# Notes:

- Even though all the project repos(frontend and backend) are in the same folder it's good to work with seperate repos in production level.
- Prisma Studio is a buggy interface, so don't be afraid and try to solve any errors.

# Tech Stack

- Typescript(Mandatory): https://www.w3schools.com/typescript
- Angular: https://angular.dev/overview
- Nest.JS: https://nestjs.com/
- Prisma: https://www.prisma.io/
- Material UI: https://material.angular.dev
- Sass(No need to learn in-depth,it's just CSS with some enhancements.): https://www.w3schools.com/sass

## Additional Tools

- Twilio for SMS services: https://www.twilio.com

There may be others service which will be added laters.

---

---

---

If there's any problem contact WAD Roneth(wadroneth@gmail.com).
