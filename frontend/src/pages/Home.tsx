import Logo from "../components/Logo";

type HomeProps = {
  user: string;
};

const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div>
      <div className="flex justify-center items-center w-screen mt-10">
        <Logo />
      </div>
      <div className="flex justify-center items-center w-screen mt-1">
        <p className="text-xl">Witaj {user}!</p>
      </div>
    </div>
  );
};

export default Home;
