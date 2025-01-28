import { Link } from "react-router";

const Home = () => {
  return (
    <div className="p-10">
      <div className="text-center">
        <h1 className="font-bold text-3xl underline">Infinion Assessment</h1>
      </div>
      <div className="flex justify-center items-center my-20 gap-10">
        <div className="border-2 border-black p-10 rounded-lg min-w-32">
          <Link
            to={"/chat-assist"}
            className="text-2xl font-semibold text-blue-600 hover:underline"
          >
            Chat Assistant
          </Link>
        </div>
        <div className="border-2 border-black p-10 rounded-lg min-w-32">
          <Link
            to={"/analytics"}
            className="text-2xl font-semibold text-blue-600 hover:underline"
          >
            Analytics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
