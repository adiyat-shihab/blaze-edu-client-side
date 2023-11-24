import { LazyLoadImage } from "react-lazy-load-image-component";
import { Outline } from "../Component/Home/Outline.jsx";
import { Helmet } from "react-helmet";
import { LearningExperience } from "../Component/Home/LearningExperience.jsx";
import { Partners } from "../Component/Home/Partners.jsx";
import { JoinTeacher } from "../Component/Home/JoinTeacher.jsx";
import { Banner } from "../Component/Home/Banner.jsx";

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Banner />

      <LearningExperience />
      <Partners />
      <JoinTeacher />
    </div>
  );
};
