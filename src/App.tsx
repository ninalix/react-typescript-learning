// import { useState } from 'react' // named export - used to manage state in functional components, allowing the component to have its own state and re-render when the state changes
import './App.css'
// import UserCard from './components/UserCard'
import Button from './examples/basics/Button'
import Card from './examples/basics/Card'
import Counter from './examples/basics/Counter'
import NameInput from './examples/basics/Input'
import UserStatus from './examples/basics/UserStatus'
// import UserList from './components/UserList'
import UserForm from './examples/basics/Form'
import WindowWidth from './examples/basics/WindowWidth'
import Users from './examples/basics/Users'
// import UserManagement from './components/UserManagement'
import NameDemo from './examples/basics/NameDemo'
import WindowWidthDemo from './examples/hooks/WindowWidthDemo'
import UserManagement from './examples/reducer/user-management/UserManagement'
import { UserProvider } from './examples/context/users/UserContext'
import { TaskProvider } from './examples/context/task/TaskContext'
import TaskList from './examples/context/task/TaskList'
import TaskStats from './examples/context/task/TaskStats'
import AddTaskForm from './examples/context/task/AddTaskForm'
import RouterExample from './examples/router/RouterExample'
// <> </>React fragment - used to group multiple elements without adding an extra node to the DOM

function App() {
  return (
    <main>
      <h1>React + TypeScript</h1>
      <p>Day 8</p>
      {/* <UserCard 
        name="Nina" 
        isOnline={true}
      />
      <Button label="Save" variant="primary" />
      <Button label="Cancel" variant="secondary" />
      <Button label="Delete" variant="danger" />
      <Card>
        <h2>TypeScript Day 8</h2>
        <p>React + TypeScript</p>
      </Card>
      <Counter />
      <NameInput />
      <UserStatus name='Nina'/>
      <UserList /> */}
      {/* <UserForm />
      <WindowWidth /> */}
      {/* <Users /> */}
      {/* <UserManagement /> */}
      {/* <NameDemo />
      <WindowWidthDemo /> */}
      {/* <UserManagement />
      <UserProvider>

      </UserProvider>
      <TaskProvider>
        <AddTaskForm />
        <TaskStats />
        <TaskList />
      </TaskProvider> */}
      <RouterExample />
    </main>
  )
}

export default App
