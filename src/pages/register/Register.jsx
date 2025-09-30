import RegisterForm from "../../components/RegisterForm";

const RegisterPage = () => {
  return (
    <main className="bg-[#F5E8C7] min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
