import React from "react";

declare global {
  type TRegisterValues = IKeyValue & {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };

  type TSigninValues = IKeyValue & {
    email: string;
    password: string;
  };

  interface IFieldType extends IKeyValue {
    name: string;
    type: "text" | "password";
    placeholder: string;
    value: string;
  }
}

interface IFormProps {
  formHeader: string;
  fields: IFieldType[];
  onSubmit: (fields: TRegisterValues) => void;
}

const Form = (props: IFormProps) => {
  const [authLoading, setAuthLoading] = React.useState<boolean>(false);
  const [formValues, setFormValues] = React.useState<TRegisterValues>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnFormSubmit = (
    event: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setAuthLoading(true);
    props.onSubmit(formValues);
    setAuthLoading(false);
  };

  return (
    <div className="rounded-sm border-2 border-black bg-gray-100 shadow-lg place-self-center w-full">
      <h1 className="py-2 text-center font-bold text-white text-4xl bg-black w-full">
        {props.formHeader}
      </h1>
      <form action="" method="" onSubmit={(e) => handleOnFormSubmit(e)} id="Authentication-form">
        <div className="flex justify-center flex-col py-6">
          {props.fields.map((field, index) => (
            <input
              key={index}
              className="my-2 mx-8 py-1 px-2 border-2 border-gray-200 shadow-md"
              type={field.type}
              placeholder={field.placeholder}
              value={formValues[field.name]}
              onChange={(e) => setFormValues({ ...formValues, [field.name]: e.target.value })}
            />
          ))}
        </div>
        {authLoading ? (
          <div>loading</div>
        ) : (
          <div className="flex justify-center pb-2">
            <button
              type="submit"
              onClick={(e) => handleOnFormSubmit(e)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-sm shadow-lg focus:outline-none border-2 border-black"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
