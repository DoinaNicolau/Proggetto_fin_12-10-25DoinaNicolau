import RegisterForm from "../../components/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gray-900">
      <div className="w-full max-w-md">
        {/* Form già con stili scuri */}
        <RegisterForm />

        {/* Link al login */}
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            Hai già un account? Accedi
          </Link>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
