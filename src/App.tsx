import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PostsList} from "./components/PostsList";
import {Provider} from "react-redux";
import store from "./store";
import {AddPostForm} from "./components/AddPostForm";
import {SinglePostPage} from "./pages/SinglePostPage";
import {EditPostForm} from "./components/EditPostForm";


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
        <Route path="/posts" element={<PostsList />}/>
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/editPost/:postId" element={<EditPostForm />} />
      </Routes>
     </BrowserRouter>
  </Provider>
  )
}

export default App
