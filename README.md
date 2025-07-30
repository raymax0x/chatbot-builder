# Chatbot Builder

A modern, modular React application for building and visualizing chatbot flows. This application allows users to create, edit, and save chatbot conversation flows using a drag-and-drop interface.

## Features

- Drag-and-drop interface for building chatbot flows
- Inline text editing for message nodes
- Modern UI with WhatsApp-style message nodes
- Flow visualization with customizable edges
- Save functionality with toast notifications
- Modular architecture for easy extension

## Technology Stack

- React 18 with TypeScript
- React Flow for node-based UI
- React-Toastify for notifications
- CSS Modules for styling
- Vite for fast development and building

## Project Structure

```
src/
├── components/         # React components
│   ├── edges/          # Edge components for ReactFlow
│   │   └── CustomEdge.tsx
│   ├── icons/          # Reusable SVG icon components
│   │   ├── MessageIcon.tsx
│   │   ├── SaveIcon.tsx
│   │   ├── WhatsAppIcon.tsx
│   │   └── index.ts
│   ├── layout/         # Layout components
│   │   ├── Flow.tsx    # Main ReactFlow canvas
│   │   ├── Navbar.tsx  # Top navigation bar
│   │   └── Sidebar.tsx # Sidebar with draggable nodes
│   ├── nodes/          # Node components for ReactFlow
│   │   └── TextNode.tsx
│   └── sidebar/        # Sidebar-specific components
│       ├── NodePreview.tsx
│       └── TextNodePreview.tsx
├── nodeTypes/          # Node type definitions and registry
│   └── index.ts
├── styles/             # CSS modules
│   ├── flow.css
│   ├── global.css
│   ├── index.css
│   ├── navbar.css
│   ├── node.css
│   └── sidebar.css
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Component Overview

### Layout Components

- **Navbar**: Top navigation bar with save button
- **Sidebar**: Left sidebar with draggable node types
- **Flow**: Main canvas where the chatbot flow is built and visualized

### Node Components

- **TextNode**: WhatsApp-style message node with inline editing

### Edge Components

- **CustomEdge**: Styled connection between nodes

### Icon Components

- **SaveIcon**: Icon for the save button
- **MessageIcon**: Icon for the text node header
- **WhatsAppIcon**: WhatsApp branding icon

### Node Type System

The application uses a registry-based approach for node types, allowing easy extension with new node types. Each node type can define:

- A main component for rendering in the flow
- A preview component for the sidebar
- Type-specific properties and behavior

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
