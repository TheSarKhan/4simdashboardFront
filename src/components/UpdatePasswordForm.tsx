import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import eyeIcon from "../assets/icons/eye.svg";
import { useState } from "react";

export default function UpdatePasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Enter new password")
      .min(8, "Must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Confirm your new password")
      .min(8, "Must be at least 8 characters long"),
  });

  return (
    <>
      <h1 className="font-bold text-3xl mb-6">Şifrəni yenilə</h1>
      <div className="w-full">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted:", values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 w-full">
              {/* New password */}
              <div className="w-full">
                <label className="font-bold text-sm mb-1 block">
                  Yeni şifrə
                </label>

                <div className="relative">
                  <Field
                    placeholder="Ən azı 8 simvol olmalıdır"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="border border-gray-300 rounded-md px-2 py-2 w-full pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword((p) => !p)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <img
                      src={eyeIcon}
                      alt="toggle password"
                      className="w-5 h-5 opacity-70"
                    />
                  </button>
                </div>

                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* Confirm password */}
              <div>
                <label className="font-bold text-sm mb-1 block">
                  Yeni şifrəni təsdiqlə
                </label>

                <div className="relative">
                  <Field
                    placeholder="Ən azı 8 simvol olmalıdır"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="border border-gray-300 rounded-md px-2 py-2 w-full pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <img
                      src={eyeIcon}
                      alt="toggle password"
                      className="w-5 h-5 opacity-70"
                    />
                  </button>
                </div>

                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#306DD8] text-white py-3 rounded-lg w-full"
              >
                Təsdiqlə
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
