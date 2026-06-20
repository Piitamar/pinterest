import "./App.css";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopBar from './components/layout/TopBar.jsx';
import LeftBar from './components/layout/LeftBar.jsx';
import MainPage from './pages/MainPage.jsx';
import SignUp from './features/auth/Signup.jsx';
import SignIn from './features/auth/SignIn.jsx';
import Create from './pages/Create.jsx';
import CreatePin from './features/pins/CreatePin.jsx';
import SaveFromUrl from './features/pins/SaveFromUrl.jsx';
import CreateBoard from './features/boards/CreateBoard.jsx';
import MyBoards from './features/boards/MyBoards.jsx';
import ViewBoard from './features/boards/ViewBoard.jsx';
import Pin from './features/pins/Pin.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <main className="app" >
        <LeftBar />

        <section>
          <Toaster position="bottom-center" reverseOrder={false} />
          <TopBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

            <Route path="/create" element={<Create />} />
            <Route path="/createPin" element={<CreatePin />} />
            <Route path="/createBoard" element={<><MainPage /><CreateBoard /></>} />
            <Route path="/createPin/saveFromUrl" element={<SaveFromUrl />} />

            <Route path="/myBoards" element={<MyBoards />} />
            <Route path="/board/:boardId" element={<ViewBoard />} />

            <Route path="/pins/:pinId" element={<Pin />} />
          </Routes>
        </section>
      </main>
    </BrowserRouter>
  )
}
