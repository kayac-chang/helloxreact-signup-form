import React, { useState } from "react";
import { ReactComponent as Error } from "../images/icon-error.svg";

function clsx(...className) {
  return className.filter(Boolean).join(" ");
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function Card({ children, className }) {
  return (
    <div className={clsx("p-4 rounded-lg shadow", className)}>{children}</div>
  );
}

function Button({ children, className }) {
  return (
    <button className={clsx("p-4 rounded shadow-solid w-full", className)}>
      {children}
    </button>
  );
}

function Input({ id, label, type = "text", error }) {
  const [_value, setValue] = useState("");

  return (
    <div>
      <div className="relative flex justify-start items-center">
        <input
          type={type}
          id={id}
          name={id}
          className={clsx(
            "w-full p-4 rounded peer",
            !error ? "border" : "border-2 border-red"
          )}
          value={_value}
          onChange={(e) => setValue(e.target.value)}
        />

        <label
          htmlFor={id}
          className={clsx(
            "absolute p-4 w-full h-full",
            "flex items-center",
            "text-sm font-semibold",
            "peer-focus:opacity-0",
            _value && "opacity-0",
            !error ? "text-blue-dark opacity-75" : "text-red"
          )}
        >
          {label}
        </label>

        {error && <Error className="absolute right-0 p-4 h-full text-red" />}
      </div>

      {error && (
        <div className="flex justify-end mt-1">
          <strong className="text-xs text-red">{error}</strong>
        </div>
      )}
    </div>
  );
}

function Form() {
  const [fields, setFields] = useState([
    {
      id: "first-name",
      label: "First Name",
      error: false,
      validate: Boolean,
      errorMsg: "First Name cannot be empty",
    },
    {
      id: "last-name",
      label: "Last Name",
      error: false,
      validate: Boolean,
      errorMsg: "Last Name cannot be empty",
    },
    {
      id: "email-address",
      label: "Email Address",
      error: false,
      validate: validateEmail,
      errorMsg: "Looks like this is not an email",
    },
    {
      id: "password",
      label: "Password",
      error: false,
      validate: Boolean,
      errorMsg: "Password cannot be empty",
    },
  ]);

  /**
   * @param {Event} event
   */
  function onSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    setFields((fields) =>
      fields.map((field) => ({
        ...field,
        error: !field.validate(data[field.id]),
      }))
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {fields.map(({ id, label, error, errorMsg }) => (
        <Input key={id} id={id} label={label} error={error && errorMsg} />
      ))}

      <Button className="bg-green text-white">CLAIM YOUR FREE TRIAL</Button>

      <p className="text-xs text-blue-grayish text-center px-4">
        By clicking the button, you are agreeing to our{" "}
        <a href="#" className="text-red font-bold">
          Terms and Services
        </a>
      </p>
    </form>
  );
}

function App() {
  return (
    <div className="min-h-screen px-6 py-20 grid lg:grid-cols-2 place-content-center gap-16 max-w-screen-xl mx-auto">
      <section className="text-white my-auto text-center lg:text-left space-y-4">
        <h1 className="text-2.5xl font-bold">
          Learn to code by watching others
        </h1>

        <p className="text-base">
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </section>

      <section className="space-y-4">
        <Card className="bg-blue">
          <p className="text-white text-center px-12">
            <b>Try it free 7 days</b> then $20/mo. thereafter
          </p>
        </Card>

        <Card className="bg-white">
          <Form />
        </Card>
      </section>
    </div>
  );
}

export default App;
