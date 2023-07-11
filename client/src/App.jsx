import { useState } from 'react';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom';
import {logo} from './assets';
import { Home,CreatePost } from './pages';


function App() {


  return (
   <BrowserRouter>
    <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
    <Link to='/' className='object-contain w-28'><img src={logo} alt='logo'/></Link>
    <Link to='/createPost' className='font-inter font-medium px-4 py-2 rounded-md bg-[#6469ff] text-white'>Create</Link>
    </header>
    <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createPost' element={<CreatePost/>}/>
      </Routes>
    </main>
   </BrowserRouter>
  )
}

export default App
