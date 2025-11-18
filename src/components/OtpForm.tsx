import { Formik, Form } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

interface OtpValues {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
}

const OtpForm = ({ email }: { email: string }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const validationSchema = Yup.object({
    otp0: Yup.string().matches(/^\d$/, "Только цифра").required(),
    otp1: Yup.string().matches(/^\d$/, "Только цифра").required(),
    otp2: Yup.string().matches(/^\d$/, "Только цифра").required(),
    otp3: Yup.string().matches(/^\d$/, "Только цифра").required(),
    otp4: Yup.string().matches(/^\d$/, "Только цифра").required(),
    otp5: Yup.string().matches(/^\d$/, "Только цифра").required(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    setFieldValue: FormikHelpers<OtpValues>["setFieldValue"]
  ) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    setFieldValue(`otp${index}`, value);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      e.key === "Backspace" &&
      !(e.target as HTMLInputElement).value &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const initialValues: OtpValues = {
    otp0: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
  };

  return (
    <>
      <h1 className="font-bold text-3xl mb-2">
        Zəhmət olmasa mailinizi yoxlayın
      </h1>
      <span className="text-[#000000B2] mb-8 font-medium">
        Kod{" "}
        <span className="text-black font-medium">
          {email !== "" ? email : "helloworld@gmail.com"}
        </span>{" "}
        hesabına göndərildi
      </span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const otp = Object.values(values).join("");
          console.log("OTP:", otp);
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex gap-2 justify-between">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  onChange={(e) => handleChange(e, i, setFieldValue)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-14 aspect-square text-center border rounded-xl border-gray-300 text-lg"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#306DD8] text-white py-3 rounded-lg w-full"
            >
              Təsdiqlə
            </button>
            <div className="flex justify-center items-center">
              <button type="button" className="font-semibold text-[#000000B2]">
                Kodu yenidən göndər
              </button>
              <span className="ml-1 text-[#000000B2]">00:20</span>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OtpForm;
