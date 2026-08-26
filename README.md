# Horizon

A full-stack real-time collaboration platform inspired by modern community and communication applications.

Horizon allows users to create and manage workspaces, communicate through text channels and direct messages, and collaborate through audio and video channels.

## Features

- User authentication
- Workspace/server creation and management
- Workspace member management
- Role-based member permissions
- Text channels
- Direct messaging
- Real-time messaging
- Audio channels
- Video channels
- File and image uploads
- Responsive interface
- Persistent application data

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- React Query

### Backend

- Next.js API Routes
- Prisma
- MySQL
- Socket.IO

### Authentication & Services

- Clerk
- LiveKit
- UploadThing

## Architecture

Horizon uses a full-stack Next.js architecture with server-side API routes, a relational database, and real-time communication.

```text
                    ┌─────────────────────┐
                    │      Next.js        │
                    │  React + TypeScript │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
      │ REST APIs   │   │ Socket.IO   │   │   LiveKit   │
      │             │   │             │   │             │
      │ Application │   │ Real-time   │   │ Audio/Video │
      │ operations  │   │ messaging   │   │             │
      └──────┬──────┘   └─────────────┘   └─────────────┘
             │
             ▼
      ┌─────────────┐
      │   Prisma    │
      │     ORM     │
      └──────┬──────┘
             │
             ▼
      ┌─────────────┐
      │    MySQL    │
      │             │
      │ Persistent  │
      │    data     │
      └─────────────┘
```
## Data Model
The application uses Prisma with MySQL to manage relational data.

The main entities include:

- Profiles — authenticated user profiles
- Servers — user-created workspaces
- Members — users belonging to workspaces with assigned roles
- Channels — text, audio, and video channels
- Messages — messages posted in text channels
- Conversations — direct-message conversations between members
- Direct Messages — messages within direct conversations
The database also uses relational constraints, cascading deletes, unique constraints, and indexes for frequently queried relationships.

## Real-Time Communication
Socket.IO is used for real-time application functionality, particularly messaging and communication events.

The application also integrates LiveKit for real-time audio and video communication within workspace channels.

This allows Horizon to combine persistent application data with real-time interactions.

## Authentication
Clerk is used for user authentication and account management.

Authenticated users are associated with application profiles and workspace memberships.

## File Uploads
UploadThing is used for authenticated file uploads and workspace/server image management.

## State Management
The frontend uses:

- Zustand for client-side application state
- React Query for asynchronous server-state management and data fetching
## Getting Started
## Prerequisites
Node.js
MySQL database
Clerk account
LiveKit account
UploadThing account
## Installation
Clone the repository:
```
git clone https://github.com/imminent-byte/Horizon.git
cd Horizon
```
Install dependencies:
```
npm install
```
Create a .env file and configure the required environment variables.

Example:
```
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```
Run the Prisma setup:
```
npx prisma generate
npx prisma db push
```
Start the development server:
```
npm run dev
```
Open:
```
http://localhost:3000
```
## Project Structure
```
Horizon/
├── app/
├── components/
├── hooks/
├── lib/
├── pages/
│   └── api/
│       └── socket/
├── prisma/
├── public/
├── middleware.ts
├── package.json
└── tsconfig.json
```

## Potential improvements include:

- Adding message pagination and optimization
- Improving error handling and validation
- Expanding workspace permissions
- Adding additional collaboration features
- Improving production deployment and monitoring
