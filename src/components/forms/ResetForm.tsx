import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function ResetForm({
  setOtpSent,
  setEmail,
}: {
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  const validationSchema = Yup.object({
    email: Yup.string().required("Enter email"),
  });
  return (
    <>
      <h1 className="font-bold text-3xl mb-8">Şifrəni unutmusan?</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setOtpSent(true);
          console.log("Submitted:", values);
          setEmail(values.email);
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#306DD8] text-white py-3 rounded-lg w-full"
            >
              Kod göndər
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
