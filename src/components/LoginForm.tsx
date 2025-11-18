import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function LoginForm() {
  const validationSchema = Yup.object({
    email: Yup.string().required("Enter email"),
    password: Yup.string().required("Enter password"),
  });
  return (
    <>
      <h1 className="font-bold text-2xl">Xoş gəlmisiniz</h1>
      <span className="text-[#666] mt-2 mb-6 block">Hesabınıza daxil olun</span>
      <div className="w-full">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted:", values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 w-full">
              <div className="w-full">
                <label className="font-bold mb-1 block">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="border border-gray-300 rounded-md px-2 py-2 w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <div>
                <label className="font-bold mb-1 block">Şifrə</label>
                <Field
                  name="password"
                  type="password"
                  className="border border-gray-300 rounded-md px-2 py-2 w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#306DD8] text-white py-3 rounded-lg w-full"
              >
                Daxil ol
              </button>
            </Form>
          )}
        </Formik>
        <Link
          to="/reset-password"
          className="text-[#667EEA] text-center w-full block mt-6"
        >
          Şifrəni unutdum
        </Link>
      </div>
    </>
  );
}
