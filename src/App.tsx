import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PostsList} from "./components/PostsList";
import {Provider} from "react-redux";
import store from "./store";
import {AddPostForm} from "./components/AddPostForm";


function App() {
  return (
   <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <AddPostForm />
            <PostsList />
          </>
        }/>
      </Routes>
     </BrowserRouter>
  </Provider>
  )
}

export default App
