GitHub Repo: https://github.com/Mainu0177/Vehicle-Rental-System
Live Deployment: https://vhicle-rental-system.vercel.app


Features:
Authentication & Authorization
->JWT-base login & registration
-> Role-base access control (admin & customer)

Vehicle Management
-> add, update, delete, list vehicle
-> Vehicle availability management
-> Automatic update after booking

Booking Management
-> create booking
-> cancel booking (customer)
-> mark booking as returned (admin)
-> booking history with joined customer & vehicle data

User Panel
-> customer can view personal bookings
-> admin can view all booking with extra details

Tech Stack
->backend: -> Node.js, Express.js, Typescript
->database: -> PostgreSQL -> query -> pg
->deployment: -> vercel
->architecture: -> Modular Pattern (Controller -> Service -> Route) 
