import Link from "next/link";
import Feed from "@components/Feed";
import Form from "@components/Form";
import Profile from "@components/Profile";
import PromptCard from "@components/PromptCard";
import CustomModal from "@components/CustomModal";
// import MyGaugeChart from "@components/MyGaugeChart";
import MyModal from "@components/MyModal";

const Home = () => (
  <>
      <section className='w-full flex flex-col justify-center items-center'>
        <h1 className='head_text text-center'>
          Welcome to QuizMaster
          <br className='max-md:hidden' />
          <span className='blue_gradient text-center'> Challenge Your Knowledge</span>
        </h1>
        <p className='desc text-center'>
          QuizMaster is your ultimate destination to test your knowledge, learn new facts, and compete with friends. Dive into a wide range of quizzes across various topics and discover how much you really know.
        </p>
        <div className='mt-8'>
          <Link href='/quizzes' className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300'>  
              Get Started 4
          </Link>
        </div>
        {/* <MyGaugeChart correct={6} incorrect={2} unanswered={2}/> */}
      </section>
  </>
);

export default Home;