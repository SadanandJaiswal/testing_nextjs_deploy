import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Quiz App",
  description: "Discover & Take Variety of Quizzes",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
        <ToastContainer />
      </Provider>
    </body>
  </html>
);

export default RootLayout;
