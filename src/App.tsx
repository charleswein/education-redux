import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import {AddPostForm} from "./components";
import {
  SinglePostPage,
  PostsList,
  EditPostForm,
  UserPage,
  UsersList,
  NotificationsList
} from "./pages";
import {Navbar} from "./components";

function App() {
  return (
   <Provider store={store}>
     <BrowserRouter>
      <Navbar/>
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
        <Route path="/users" element={<UsersList/>} />
        <Route path="/users/:userId" element={<UserPage/>} />
        <Route path="/notifications" element={<NotificationsList/>} />
      </Routes>
     </BrowserRouter>
  </Provider>
  )
}

export default App
