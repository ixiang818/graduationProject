import HomePage from './pages/home.vue';
import UserPage from './pages/user.vue';
import LoginPage from './pages/login.vue';
import DisplayPage from './pages/display.vue';
import CreateWordPage from './pages/createWord.vue';
import CreatePhotoPage from './pages/createPhoto.vue';
import MediaLibraryPage from './pages/mediaLibrary.vue'

export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/user/',
    component: UserPage,
  },
  {
    path: '/login/',
    component: LoginPage,
  },
  {
    path: '/display/',
    component: DisplayPage,
  },
  {
    path: '/createWord/',
    component: CreateWordPage,
  },
  {
    path: '/createPhoto/',
    component: CreatePhotoPage,
  },
  {
    path: '/medialibrary/',
    component: MediaLibraryPage,
  },
];
